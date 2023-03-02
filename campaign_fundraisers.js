import { check, sleep } from "k6";
import { Counter, Rate } from "k6/metrics";
import http from "k6/http";

let errorCampaignFundraisers = new Counter("errors_CampaignFundRaisers");

const data = JSON.parse(open('./data/data.json'));

const getCampaignFundraisers = () => {
    let newtoken = data.token
    let campaignIds = data.campaignId;
    let id = campaignIds[Math.floor(Math.random()*campaignIds.length)];
    let params = {
        timeout: 1200000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${newtoken}`,
            "X-Ktbs-Api-Version": `3.3.0`,
            "X-Ktbs-Client-Version": `3.3.0`,
            "X-Ktbs-Client-Name": `sekawan`,
            "X-Ktbs-Platform-Name": `kanvas`,
            "X-Ktbs-Time": `1602485289`,
            "X-Ktbs-Signature": `7b76a0c8e6b1dc4364d3db77c572a25e34ffe348ea2a6ac5528a77633dc2abf6`,
            "X-Ktbs-Request-ID": `1536e45c-35ba-4b5f-ae26-369f82257669`
        }
    };

    var res = http.get(data.baseUrl+"/campaigns/"+id+"/fundraisers", params);

    if (res.status !== 200) {
        errorCampaignFundraisers.add(1)
        console.log(res.status+ " | " +res.body);
        console.log(res);
    }

    console.log(res);
    return res;
}

export default function() {
    check(getCampaignFundraisers(), {
        "200 Get Campaign Fundraisers By Campaign ID": r => r.status === 200
    });
    sleep(1);
}