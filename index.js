require('dotenv').config()
const { Rivago, Delhivery } = require('./src/track3r')
const SEC = 1000
const MIN = 60 * SEC

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const rivago = new Rivago(process.env.RIVAGO_TRACKING_ID)
const delhivery = new Delhivery(process.env.DELIVERY_TRACKING_ID)

process.stdin.on('keypress', (str, key) => {
    if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
        process.exit();
    } else if (key.name === 'r') {
        trackFactory()
    }
});

function trackFactory() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    delhivery.track()
        .then((resp) => {
            if (resp.data && resp.data.length > 0) {
                process.stdout.write(`Delhivery: ${resp.data[0].status.status}\t`)
            }
            return rivago.track()
        })
        .then((resp) => {
            if (resp.status === 'SUCCESS') {
                process.stdout.write(`Rivago: ${resp.response.displayStatusDto.primaryText} - ${resp.response.displayStatusDto.subText}`)
            } else {
                process.stdout.write(`[ERROR]: Recived Error status from Server`)
            }
        })
        .catch((error) => {
            process.stdout.write(`[ERROR]: ${error}`)
        })

}



// MAIN
console.log('Press r to Refresh or Ctrl+C to exit ...')
trackFactory()
setInterval(() => {
    trackFactory()
}, 5 * MIN);