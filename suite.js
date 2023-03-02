import campaign_fund from "./campaign_fund.js"
import campaign_fundraisers from "./campaign_fundraisers.js"
import campaign_medical from "./campaign_medical.js";
import campaign_rab from "./campaign_rab.js";
import campaign from "./campaign.js"

export let options = {
  setupTimeout: '120s',
  teardownTimeout: '120s',
  stages: [
    { duration: "1m", target: 270 },  
    { duration: "1m", target: 350 },
    { duration: "1m", target: 400 },
    { duration: "2m", target: 550 },
    { duration: "2m", target: 650 },
    { duration: "2m", target: 800 },
  ]
};

export default() => {
    campaign_fund()
    campaign_fundraisers()
    campaign_medical()
    campaign_rab()
    campaign()
}
