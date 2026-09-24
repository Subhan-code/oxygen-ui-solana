export const DEMO_LOADERS: Record<string, () => Promise<unknown>> = {
  "accountcard": () => import("@/app/components/(docs)/accountcard/demo"),
  "actionbox": () => import("@/app/components/(docs)/actionbox/demo"),
  "activityfeed": () => import("@/app/components/(docs)/activityfeed/demo"),
  "addressdisplay": () => import("@/app/components/(docs)/addressdisplay/demo"),
  "animatedtabs": () => import("@/app/components/(docs)/animatedtabs/demo"),
  "authcard": () => import("@/app/components/(docs)/authcard/demo"),
  "balancedisplay": () => import("@/app/components/(docs)/balancedisplay/demo"),
  "cardstack": () => import("@/app/components/(docs)/cardstack/demo"),

  "cryptocheckoutcard": () => import("@/app/components/(docs)/cryptocheckoutcard/demo"),
  "cryptopricepills": () => import("@/app/components/(docs)/cryptopricepills/demo"),

  "cryptoexplorecategories": () => import("@/app/components/(docs)/cryptoexplorecategories/demo"),
  "cryptopredictioncandidatecard": () => import("@/app/components/(docs)/cryptopredictioncandidatecard/demo"),
  "cryptosalescandlestickchart": () => import("@/app/components/(docs)/cryptosalescandlestickchart/demo"),
  "cryptosalessegmentedbars": () => import("@/app/components/(docs)/cryptosalessegmentedbars/demo"),
  "cryptosalesverticalgraph": () => import("@/app/components/(docs)/cryptosalesverticalgraph/demo"),
  "cryptosubscriptioncard": () => import("@/app/components/(docs)/cryptosubscriptioncard/demo"),

  "cryptoswapbox": () => import("@/app/components/(docs)/cryptoswapbox/demo"),
  "cryptotradingterminal": () => import("@/app/components/(docs)/cryptotradingterminal/demo"),

  "cryptotvlanalyticschart": () => import("@/app/components/(docs)/cryptotvlanalyticschart/demo"),
  "cryptotvlsparkbarwidget": () => import("@/app/components/(docs)/cryptotvlsparkbarwidget/demo"),
  "cryptouserprofile": () => import("@/app/components/(docs)/cryptouserprofile/demo"),

  "cryptowalletdashboard": () => import("@/app/components/(docs)/cryptowalletdashboard/demo"),
  "cryptowalletdrawer": () => import("@/app/components/(docs)/cryptowalletdrawer/demo"),
  "cryptowalletmain": () => import("@/app/components/(docs)/cryptowalletmain/demo"),
  "cryptowalletsettings": () => import("@/app/components/(docs)/cryptowalletsettings/demo"),
  "digitswap": () => import("@/app/components/(docs)/digitswap/demo"),
  "errorstateshake": () => import("@/app/components/(docs)/errorstateshake/demo"),
  "familydialog": () => import("@/app/components/(docs)/familydialog/demo"),
  "familydrawer": () => import("@/app/components/(docs)/familydrawer/demo"),
  "familypopovermenu": () => import("@/app/components/(docs)/familypopovermenu/demo"),
  "financialmetricsgrid": () => import("@/app/components/(docs)/financialmetricsgrid/demo"),
  "gauge": () => import("@/app/components/(docs)/gauge/demo"),

  "gooeymenu": () => import("@/app/components/(docs)/gooeymenu/demo"),
  "inputmorphmessage": () => import("@/app/components/(docs)/inputmorphmessage/demo"),
  "leverageslider": () => import("@/app/components/(docs)/leverageslider/demo"),
  "liquidradio": () => import("@/app/components/(docs)/liquidradio/demo"),
  "liquiditypoolcard": () => import("@/app/components/(docs)/liquiditypoolcard/demo"),
  "marquee": () => import("@/app/components/(docs)/marquee/demo"),

  "multistatebadge": () => import("@/app/components/(docs)/multistatebadge/demo"),
  "multiwalletswitcher": () => import("@/app/components/(docs)/multiwalletswitcher/demo"),
  "orderbook": () => import("@/app/components/(docs)/orderbook/demo"),
  "orderform": () => import("@/app/components/(docs)/orderform/demo"),
  "oxygenuipill": () => import("@/app/components/(docs)/oxygenuipill/demo"),
  "poolcard": () => import("@/app/components/(docs)/poolcard/demo"),
  "pooltable": () => import("@/app/components/(docs)/pooltable/demo"),
  "positioncard": () => import("@/app/components/(docs)/positioncard/demo"),

  "positiontable": () => import("@/app/components/(docs)/positiontable/demo"),
  "priceticker": () => import("@/app/components/(docs)/priceticker/demo"),
  "priorityfeeselector": () => import("@/app/components/(docs)/priorityfeeselector/demo"),
  "progressring": () => import("@/app/components/(docs)/progressring/demo"),
  "qrcode": () => import("@/app/components/(docs)/qrcode/demo"),
  "routesummary": () => import("@/app/components/(docs)/routesummary/demo"),
  "runstatsstacks": () => import("@/app/components/(docs)/runstatsstacks/demo"),
  "secretkeywarningbox": () => import("@/app/components/(docs)/secretkeywarningbox/demo"),
  "segmentedprogresscard": () => import("@/app/components/(docs)/segmentedprogresscard/demo"),

  "signaturestatusbadge": () => import("@/app/components/(docs)/signaturestatusbadge/demo"),
  "slippageselector": () => import("@/app/components/(docs)/slippageselector/demo"),



  "smoothtabs": () => import("@/app/components/(docs)/smoothtabs/demo"),
  "solanaidentitycard": () => import("@/app/components/(docs)/solanaidentitycard/demo"),
  "solananftcard": () => import("@/app/components/(docs)/solananftcard/demo"),
  "solanatokencard": () => import("@/app/components/(docs)/solanatokencard/demo"),

  "solanatransactionstatus": () => import("@/app/components/(docs)/solanatransactionstatus/demo"),
  "solanawalletcard": () => import("@/app/components/(docs)/solanawalletcard/demo"),
  "spinningcounter": () => import("@/app/components/(docs)/spinningcounter/demo"),

  "stakingcard": () => import("@/app/components/(docs)/stakingcard/demo"),
  "statcard": () => import("@/app/components/(docs)/statcard/demo"),
  "steptrackerwidget": () => import("@/app/components/(docs)/steptrackerwidget/demo"),
  "successcheck": () => import("@/app/components/(docs)/successcheck/demo"),

  "togglepill": () => import("@/app/components/(docs)/togglepill/demo"),
  "tokencommand": () => import("@/app/components/(docs)/tokencommand/demo"),
  "tokenicongroup": () => import("@/app/components/(docs)/tokenicongroup/demo"),
  "tokeninput": () => import("@/app/components/(docs)/tokeninput/demo"),
  "tokenlistitem": () => import("@/app/components/(docs)/tokenlistitem/demo"),
  "tokenpair": () => import("@/app/components/(docs)/tokenpair/demo"),
  "tradebox": () => import("@/app/components/(docs)/tradebox/demo"),

  "tradebuttons": () => import("@/app/components/(docs)/tradebuttons/demo"),
  "transactionmodal": () => import("@/app/components/(docs)/transactionmodal/demo"),
  "transactionreceipt": () => import("@/app/components/(docs)/transactionreceipt/demo"),
  "trendbadge": () => import("@/app/components/(docs)/trendbadge/demo"),
  "txntable": () => import("@/app/components/(docs)/txntable/demo"),
  "txntoast": () => import("@/app/components/(docs)/txntoast/demo"),
  "walletsheet": () => import("@/app/components/(docs)/walletsheet/demo"),

  "animatedswitch": () => import("@/app/components/(docs)/togglepill/demo"),

  "tradetogglepill": () => import("@/app/components/(docs)/tradetogglepill/demo"),
  "statusbadgepill": () => import("@/app/components/(docs)/statusbadgepill/demo"),
  "uxbutton": () => import("@/app/components/(docs)/uxbutton/demo"),
  "drawcheckbox": () => import("@/app/components/(docs)/drawcheckbox/demo"),
  "metrics01": () => import("@/app/components/(docs)/metrics01/demo"),
  "bankbalancecard": () => import("@/app/components/(docs)/bankbalancecard/demo"),
  "withdrawalcard": () => import("@/app/components/(docs)/withdrawalcard/demo"),

  "verificationbadges": () => import("@/app/components/(docs)/verificationbadges/demo"),
  "passwordstrength": () => import("@/app/components/(docs)/passwordstrength/demo"),
  "tasksteps": () => import("@/app/components/(docs)/tasksteps/demo"),
  "wizardsteps": () => import("@/app/components/(docs)/wizardsteps/demo"),
  "valueflash": () => import("@/app/components/(docs)/valueflash/demo"),
  "presenceavatars": () => import("@/app/components/(docs)/presenceavatars/demo"),
  "solanaeventcard": () => import("@/app/components/(docs)/solanaeventcard/demo"),
};











