var _ = require('underscore');

module.exports = {
  data: {
    '/promotion_activity': [{
      "id": 1,
      "promotionActivityName": "ceshi",
      "startTime": "2015-06-05 18:08:04",
      "endTime": "2015-06-06 11:00:43",
      "registrationStartTime": null,
      "registrationEndTime": null,
      "creatorId": "17C1CE061A396C38E0530B07760A4644",
      "editorId": "17C1CE061A396C38E0530B07760A4644",
      "activityStatus": 0,
      "lastAuditorId": null,
      "activityNextStatus": null,
      "auditStatus": 0
    }, {
      "id": 2,
      "promotionActivityName": "推荐有奖 与好友一起领红包",
      "startTime": "2015-06-10 00:00:00",
      "endTime": "2015-07-06 23:59:59",
      "registrationStartTime": null,
      "registrationEndTime": null,
      "creatorId": "17C1CE061A396C38E0530B07760A4644",
      "editorId": "17C1CE061A396C38E0530B07760A4644",
      "activityStatus": 0,
      "lastAuditorId": null,
      "activityNextStatus": 3,
      "auditStatus": 3
    }],

    '/promotion_activity/:id': {
      "id": 1,
      "promotionActivityName": "ceshi",
      "startTime": "2015-06-05 18:08:04",
      "endTime": "2015-06-06 11:00:43",
      "registrationStartTime": null,
      "registrationEndTime": null,
      "creatorId": "17C1CE061A396C38E0530B07760A4644",
      "editorId": "17C1CE061A396C38E0530B07760A4644",
      "activityStatus": 0,
      "lastAuditorId": null,
      "activityNextStatus": null,
      "auditStatus": 0
    },

    '/promotion_activity_rule/:activity_id': [{
        "id": 1213123,
        "isRestricted": false,
        "promotedActionType": 1,
        "paidProductTypes": 1,
        "paymentType": 1,
        "measuringType": 1,
        "actionTimeframe": 10,
        "rules" : [{
          "id": 1001,
          "minPayment": 0,
          "maxPayment": 0,
          "promotedMinAmount": 1,
          "promotedMaxAmount": 5,
          "rewardsType": 1,
          "promoterRewards": 100,
          "promotedRewards": 50
        }]
      }, {
        "id": 1213124,
        "isRestricted": true,
        "promotedActionType": 1,
        "paidProductTypes": "2,3",
        "paymentType": 2,
        "measuringType": 1,
        "actionTimeframe": 10,
        "rules" : [{
          "id": 1001,
          "minPayment": 1000,
          "maxPayment": 1999,
          "promotedMinAmount": 0,
          "promotedMaxAmount": 100,
          "rewardsType": 1,
          "promoterRewards": 100,
          "promotedRewards": 50
        }, {
          "id": 1002,
          "minPayment": 2000,
          "maxPayment": 3999,
          "promotedMinAmount": 0,
          "promotedMaxAmount": 100,
          "rewardsType": 1,
          "promoterRewards": 100,
          "promotedRewards": 50
        }]
      }
    ],

    '/rewards_summary': {
      "totalCount": 12,
      "resultList": [
        {
          "date": "2015-5-13",
          "rewardsType": 1,
          "rewards": 100
        }, {
          "date": "2015-5-20",
          "rewardsType": 1,
          "rewards": 100
        }, {
          "date": "2015-5-20",
          "rewardsType": 1,
          "rewards": 100
        }, {
          "date": "2015-5-20",
          "rewardsType": 1,
          "rewards": 100
        }, {
          "date": "2015-5-20",
          "rewardsType": 1,
          "rewards": 100
        }
      ]
    },

    '/rewards_summary_detail': {
      "totalCount": 2,
      "resultList": [
        {
          "userSource": 1,
          "userId": "kjt002005",
          "actionType": 1,
          "actionTime": "2015-04-01 12:00:00",
          "productType": 100,
          "payment": 100,
          "rewards": 100,
          "description": "推荐用户13800002222"
        }, {
          "userSource": 2,
          "userId": "kjt001",
          "actionType": 1,
          "actionTime": "2015-04-01 12:00:00",
          "productType": 100,
          "payment": 100,
          "rewards": 100,
          "description": ""
        }
      ]
    },

    '/blacklist': [
      {
        "userSource": 2,
        "userId": "1430905213418",
        "createdTime": "2014-12-12 12:00:00"
      },
      {
        "userSource": 2,
        "userId": "1431582039751",
        "createdTime": "2014-12-12 12:00:00"
      }
    ],

    '/member_rewards': {
      "totalCount": 2,
      "resultList": [
        {
          "userName": "kjtpay@xxx.com",
          "rewardsType": 1,
          "rewards": 500,
          "actionType": 2,
          "promotionActivityId": 1001,
          "promotionActivityName": "推新活动",
          "description": "推荐用户18022334567",
          "status": 1,
          "rewardTime": "2015-04-01 12:00:00"
        }, {
          "userName": "kjtpay2@xxx.com",
          "rewardsType": 2,
          "rewards": 200,
          "actionType": 1,
          "promotionActivityId": 1002,
          "promotionActivityName": "推新活动2",
          "description": "推荐用户12345",
          "status": 3,
          "rewardTime": "2015-04-01 12:00:00"
        },
      ]
    },

    '/promotion_relation': {
      "totalCount": 7474,
      "resultList": [{
        "promoterSource": 2,
        "promoterId": "937",
        "promotedSource": 1,
        "promotedId": "100000516634",
        "promotionActivityName": "推荐有奖 与好友一起领红包（新）",
        "promotionSource": 1,
        "platformId": 2,
        "actionTime": "2015-07-21 13:12:29"
      }, {
        "promoterSource": 2,
        "promoterId": "937",
        "promotedSource": 1,
        "promotedId": "100000516592",
        "promotionActivityName": "推荐有奖 与好友一起领红包（新）",
        "promotionSource": 1,
        "platformId": 2,
        "actionTime": "2015-07-21 13:04:55"
      }]
    }, 

    '/rewards_distributions': {
      "totalCount": 2,
      "resultList": [{
        "sn": "1000001",
        "createdTime": "2015-08-01 12:00:00",
        "rewardsType": 1,
        "adjustType": 1,
        "rewardsAmount": 10220,
        "rewardsCount": 200,
        "activityStatus": 1
      }, {
        "sn": "1000002",
        "createdTime": "2015-08-02 12:00:00",
        "rewardsType": 2,
        "adjustType": 1,
        "rewardsAmount": 5022,
        "rewardsCount": 100,
        "activityStatus": 2
      }]
    },

    '/rewards_distributions/:sn': {
      "sn": "1000001",
      "createdTime": "2015-08-01 12:00:00",
      "rewardsType": 1,
      "adjustType": 1,
      "rewardsAmount": 100,
      "rewardsCount": 200,
      "activityStatus": 1,
      "items": [{
          "sn": "1000001001",
          "account": "xds@gmail.com",
          "rewards": 100,
          "status": 0
        }, {
          "sn": "1000002002",
          "account": "xds2@gmail.com",
          "rewards": 50,
          "status": 1
        }, {
          "sn": "1000003003",
          "account": "xds3@gmail.com",
          "rewards": 50,
          "status": 2
        }]
    },

    '/promotion_channels': {
      "totalCount": 3,
      "resultList": [
        {
          "id": 1,
          "channelType": 1,
          "channelName": "百度",
          "link": "https://www.hairongyi.com/?baidu&tuiguang",
          "shortLink": "kjt002",
          "createdTime": "2015-05-27 17:55:45"
        },
        {
          "id": 2,
          "channelType": 1,
          "channelName": "地推",
          "link": "https://www.hairongyi.com/?baidu&tuiguang",
          "shortLink": "",
          "createdTime": "2015-05-28 17:55:45"
        },
        {
          "id": 3,
          "channelType": 1,
          "channelName": "返利网",
          "link": "https://www.hairongyi.com/?baidu&tuiguang",
          "shortLink": "",
          "createdTime": "2015-05-29 17:55:45"
        }
      ]
    },

    '/promotion_channels_stat': {
      "totalCount": 2,
      "resultList": [
        {
          "date": "2015-01-02",
          "channelType": 1,
          "channelId": "1001",
          "channelName": "百度",
          "hits": 100000000,
          "ips": 99999999,
          "accounts": 892345,
          "realnameAccounts": 872345,
          "investAccounts": 22345
        }, {
          "date": "2015-01-03",
          "channelType": 1,
          "channelId": "1001",
          "channelName": "微信",
          "hits": 100000000,
          "ips": 99999999,
          "accounts": 892345,
          "realnameAccounts": 872345,
          "investAccounts": 22345
        },
      ]
    },

    '/promotion_advs': [{
        "promotionSource": 1,
        "startTime": "2015-05-29 00:00:00",
        "endTime": "2015-06-29 23:59:59",
        "title": "标题1",
        "content": "文案内容。。。"
      },
      {
        "promotionSource": 2,
        "startTime": "2015-05-29 00:00:00",
        "endTime": "2015-06-29 23:59:59",
        "title": "标题2",
        "content": "文案内容。。。"
      }
    ]
  },

  p2p: {
    '/productType': {
      "FLAG": "Y",
      "MESSAGE": [
        {"productId":"7","productName":"融易发"},
        {"productId":"8","productName":"小金票"},
        {"productId":"9","productName":"海赚"},
        {"productId":"10","productName":"小金链"},
        {"productId":"11","productName":"新客专享"},
        {"productId":"12","productName":"小金链2号"},
        {"productId":"13","productName":"预付款理财"},
        {"productId":"14","productName":"VIP专区"},
        {"productId":"15","productName":"小金蟹"},
        {"productId":"16","productName":"信用融"},
        {"productId":"17","productName":"应收出口退税款质押"},
        {"productId":"19","productName":"现房抵押贷款"}
      ]
    },

    '/usersInfo': {
      "FLAG": "Y",
      "MESSAGE": [
        {
          "email": "mengqingping2@haier.com",
          "id": 1240,
          "loginName": "mengqp",
          "phone": "18516020962"
        },
        {
          "email": "liuwenxiang@haier.com",
          "id": 1241,
          "loginName": "ceshi001",
          "phone": "15600000001"
        }
      ]
    }
  },

  kjt: {
    '/member/query-member': {
      "memberList": [
        {
          "memberId": "100000010012",
          "memberName": "陈飞",
          "loginName": "18019023103",
          "mobile": "18019023103"
        },
        {
          "memberId": "100000010013",
          "memberName": "覃德",
          "loginName": "13621722085",
          "mobile": "13621722085"
        },
        {
          "memberId": "100000010016",
          "memberName": "丁当",
          "loginName": "15216751972",
          "mobile": "15216751972"
        }
      ]
    }
  }
};