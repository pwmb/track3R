const axios = require('axios')

class RivagoTrack {
    constructor(cn) {
        this.cn = cn
    }
    track() {
        return new Promise((yes, no) => {
            let _url = `https://zoom-api.rivigo.com/tracking/v2/cnote/${this.cn}`
            axios.get(_url)
                .then((resp) => {
                    if (resp.status && resp.status === 200) {
                        yes(resp.data)
                    }else{
                        no(resp)
                    }
                })
                .catch((error) => {
                    no(error)
                })
        })
    }
}

module.exports.Rivago = RivagoTrack