// export const urls = {
//     expIssueUrl: "api/get-all-exp-issuance/",
//     expDownloadUrl: "api/get-all-exp-download/",
//     bookingUrl: "api/get-all-purchase-orders/",
//     fcrUrl: "api/get-all-invoice/",
// }

export const urls = {
    fcr: {
        get_data_url:"api/get-all-invoice/",
    },
    exp_issuance: {
        exp_issuance_bot_status_url:"exp-issuance-bot-status",
        exp_download_start_url:"start-exp-issuance-bot",
        exp_issuance_get_url:"api/get-all-exp-issuance/",
        exp_download_common_log_url: "show-exp-issuance-logs/",
        render_common_log_url: "/exp-issuance/logs"
    },
    exp_download: {
        bot_status_url:"exp-download-bot-status",
        start_bot_url:"start-exp-download-bot",
        get_data_url:"api/get-all-exp-download/",
        common_log_url: "show-exp-download-logs/",
        render_common_log_url: "/exp-download/logs"
    },
    booking: {
        get_data_url: "api/get-all-purchase-orders/",

    }
    // bookingUrl: "api/get-all-purchase-orders/",
    // fcrUrl: "api/get-all-invoice/",
}