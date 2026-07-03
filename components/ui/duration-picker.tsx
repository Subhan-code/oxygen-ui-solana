'use client'

import { Slot } from '@radix-ui/react-slot'
import { getSvgPath } from 'figma-squircle'
import { interpolate } from 'flubber'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity, type MotionStyle, type MotionValue } from 'motion/react'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'

const PEN_PATH = 'M3.78181 16.3092L3 21L7.69086 20.2182C8.50544 20.0825 9.25725 19.6956 9.84119 19.1116L20.4198 8.53288C21.1934 7.75922 21.1934 6.5049 20.4197 5.73126L18.2687 3.58024C17.495 2.80658 16.2406 2.80659 15.4669 3.58027L4.88841 14.159C4.30447 14.7429 3.91757 15.4947 3.78181 16.3092Z'
const TICK_PATH = 'M7.959 20.513L1.592 12.872L3.128 11.592L8.041 17.487L20.947 3.587L22.413 4.948L7.959 20.513Z'

type SquircleSegmentProps = {
    asChild?: boolean
    cornerSmoothing?: number
    leftRadius: number | MotionValue<number>
    rightRadius: number | MotionValue<number>
    className?: string
    style?: MotionStyle
    children: React.ReactNode
}

const MotionSlot = motion.create(Slot)

const radiusValue = (radius: number | MotionValue<number>) =>
    typeof radius === 'number' ? radius : radius.get()

const SquircleSegment = ({ asChild, cornerSmoothing = 1, leftRadius, rightRadius, className, style, children }: SquircleSegmentProps) => {
    const Component = asChild ? MotionSlot : motion.div
    const [ref, bounds] = useMeasure()
    const width = useMotionValue(0)
    const height = useMotionValue(0)

    useEffect(() => {
        width.set(bounds.width)
        height.set(bounds.height)
    }, [bounds.width, bounds.height, width, height])

    const clipPath = useTransform(() => {
        const w = width.get()
        const h = height.get()
        if (w <= 0 || h <= 0) {
            return 'none'
        }
        const left = radiusValue(leftRadius)
        const right = radiusValue(rightRadius)
        const path = getSvgPath({
            width: w,
            height: h,
            topLeftCornerRadius: left,
            bottomLeftCornerRadius: left,
            topRightCornerRadius: right,
            bottomRightCornerRadius: right,
            cornerSmoothing,
        })
        return `path('${path}')`
    })

    return (
        <Component ref={ref} className={className} style={{ ...style, clipPath }}>
            {children}
        </Component>
    )
}

type DurationInputProps = {
    value: string
    onChange: (value: string) => void
    max: number
    isEditing: boolean
    shouldReduceMotion: boolean
    shakeX: MotionValue<number>
    inputRef?: React.RefObject<HTMLInputElement | null>
}

const DurationInput = ({ value, onChange, max, isEditing, shouldReduceMotion, shakeX, inputRef }: DurationInputProps) => {
    const measureRef = useRef<HTMLSpanElement>(null)
    const [textWidth, setTextWidth] = useState(0)
    // Error shake: an underdamped spring that gets kicked sideways when the
    // user tries to type past the limit, then wobbles back to rest.
    const errorX = useSpring(0, { stiffness: 700, damping: 9 })
    const x = useTransform(() => shakeX.get() + errorX.get())

    useLayoutEffect(() => {
        if (measureRef.current) {
            setTextWidth(measureRef.current.offsetWidth)
        }
    }, [value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.value
        if (next !== '' && (Number(next) > max || Number(next) < 0)) {
            // Clamp to the ceiling so the user sees the limit, and shake to
            // signal that the value was corrected.
            onChange(String(Math.min(max, Math.max(0, Number(next)))))
            if (!shouldReduceMotion) {
                errorX.jump(6)
                errorX.set(0)
            }
            return
        }
        onChange(next)
    }

    // Wide and comfortable while editing; hugs the typed digits when confirmed.
    const collapsedWidth = Math.max(textWidth + 12, 22)

    return (
        <>
            <motion.input
                ref={inputRef}
                type="number"
                value={value}
                onChange={handleChange}
                placeholder={isEditing ? '' : '0'}
                readOnly={!isEditing}
                style={{ x, width: isEditing ? 40 : collapsedWidth }}
                animate={{ width: isEditing ? 40 : collapsedWidth }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 250, damping: 23 }}
                className='h-full text-center font-semibold text-black dark:text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
            />
            <span ref={measureRef} aria-hidden className="invisible absolute whitespace-pre font-semibold">{value || '0'}</span>
        </>
    )
}

const DurationPicker = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const shouldReduceMotion = useReducedMotion()
    const gap = useSpring(0, { stiffness: 200, damping: 16, mass: 1 })
    // Spacing between segments: springs to 8px when open, and to a 1px
    // overlap when merged so clip-path antialiasing can't leave a seam.
    const segmentSpacing = useTransform(gap, (value) => {
        const clamped = Math.min(8, Math.max(0, value))
        return `${clamped - (1 - clamped / 8)}px`
    })
    const gapVelocity = useVelocity(gap)
    const scaleX = useTransform(gapVelocity, [-70, 0, 70], [0.93, 1, 1.07], { clamp: true })
    const scaleY = useTransform(scaleX, (value) => 2 - value)
    // Inner content leans with the spring's velocity, so digits and labels
    // sway horizontally in the same motion as the pills. The extra spring
    // low-pass filters the velocity signal so the sway stays fluid.
    const contentXRaw = useTransform(gapVelocity, [-70, 0, 70], [-3, 0, 3], { clamp: true })
    const contentX = useSpring(contentXRaw, { stiffness: 200, damping: 24 })
    const innerRadius = useTransform(gap, (value) => Math.min(8, Math.max(0, value)))
    // Inner horizontal padding relaxes in edit mode and tightens when the
    // segments merge, pulling the hour and minute content closer together.
    const innerPadRight = useTransform(gap, (value) => `${3 + 9 * (Math.min(8, Math.max(0, value)) / 8)}px`)
    const innerPadLeft = useTransform(gap, (value) => `${9 * (Math.min(8, Math.max(0, value)) / 8)}px`)
    // Morphs the pen shape into the tick shape (0 = pen, 1 = tick).
    const iconProgress = useSpring(0, { stiffness: 200, damping: 20 })
    const iconPath = useTransform(iconProgress, [0, 1], [PEN_PATH, TICK_PATH], {
        clamp: true,
        mixer: (from, to) => interpolate(from, to, { maxSegmentLength: 1 }),
    })
    // Thickens the tick without touching the pen: the stroke fattens the
    // filled shape as the morph approaches the tick state.
    const iconStrokeWidth = useTransform(iconProgress, [0, 1], [0, 1.75], { clamp: true })
    const hrInputRef = useRef<HTMLInputElement>(null)

    const toggleEdit = () => {
        const next = !isEditing
        const targetGap = next ? 8 : 0
        const targetIcon = next ? 1 : 0
        if (shouldReduceMotion) {
            gap.jump(targetGap)
            iconProgress.jump(targetIcon)
        } else {
            gap.set(targetGap)
            iconProgress.set(targetIcon)
        }
        setIsEditing(next)
        if (next) {
            hrInputRef.current?.focus()
        }
    }

    return (
        <motion.div style={{ scaleX, scaleY }} className="flex flex-row items-center justify-center text-card-foreground">
            <SquircleSegment leftRadius={8} rightRadius={innerRadius} style={{ paddingRight: innerPadRight }} className="bg-[#F4F4F9] dark:bg-[#262626] h-10 flex items-center gap-1 pl-2">
                <DurationInput value={hours} onChange={setHours} max={24} isEditing={isEditing} shouldReduceMotion={!!shouldReduceMotion} shakeX={contentX} inputRef={hrInputRef} />
                <motion.span style={{ x: contentX }} className='text-[#868593]/70 font-semibold font-runde'>Hr.</motion.span>
            </SquircleSegment>
            <SquircleSegment leftRadius={innerRadius} rightRadius={innerRadius} style={{ marginLeft: segmentSpacing, paddingLeft: innerPadLeft, paddingRight: innerPadRight }} className="bg-[#F4F4F9] dark:bg-[#262626] h-10 flex items-center gap-1">
                <DurationInput value={minutes} onChange={setMinutes} max={60} isEditing={isEditing} shouldReduceMotion={!!shouldReduceMotion} shakeX={contentX} />
                <motion.span style={{ x: contentX }} className='text-[#868593]/70 font-medium font-runde'>Min.</motion.span>
            </SquircleSegment>
            <SquircleSegment asChild leftRadius={innerRadius} rightRadius={8} style={{ marginLeft: segmentSpacing }}>
                <button onClick={toggleEdit} aria-label={isEditing ? 'Save duration' : 'Edit duration'} className='w-10 h-10 bg-[#F4F4F9] dark:bg-[#262626] flex justify-center items-center active:scale-90 transition-transform'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <motion.path fill="#868593" stroke="#868593" strokeLinejoin="round"  strokeLinecap="round" style={{ strokeWidth: iconStrokeWidth }} d={iconPath} />
                    </svg>
                </button>
            </SquircleSegment>
        </motion.div>
    )
}

export default DurationPicker
