const axios = require('axios')
class DelhiveryTrack {
    constructor(cn) {
        this.cn = cn
    }
    track() {
        return new Promise((yes, no) => {
            const _url = `https://api-track.delhivery.com/track?waybillId=${this.cn}`
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

module.exports.Delhivery = DelhiveryTrack