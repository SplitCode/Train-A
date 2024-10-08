import { OrderItem } from '../../models/order-item.interface';

export const MOCK_ORDERS: OrderItem[] = [
  {
    id: 1,
    userId: 1,
    routeId: 390,
    rideId: 1384,
    seatId: 35,
    path: [
      58, 95, 39, 22, 1, 62, 61, 94, 54, 45, 15, 48, 102, 11, 20, 40, 30, 35,
      37, 31, 89, 6, 74, 51, 83, 64, 4, 50, 25,
    ],
    carriages: [
      'carriage2',
      'carriage4',
      'carriage6',
      'carriage5',
      'carriage3',
      'carriage5',
      'carriage2',
      'carriage5',
      'carriage5',
      'carriage4',
      'carriage3',
      'carriage5',
      'carriage3',
      'carriage6',
      'carriage2',
      'carriage3',
      'carriage5',
    ],
    stationStart: 1,
    stationEnd: 4,
    schedule: {
      segments: [
        {
          time: ['2024-08-25T12:52:40.186Z', '2024-08-27T13:59:40.186Z'],
          price: {
            carriage2: 2165,
            carriage4: 551,
            carriage6: 347,
            carriage5: 864,
            carriage3: 2073,
          },
        },
        {
          time: ['2024-08-27T14:31:40.186Z', '2024-08-31T01:58:40.186Z'],
          price: {
            carriage2: 542,
            carriage4: 1026,
            carriage6: 808,
            carriage5: 407,
            carriage3: 368,
          },
        },
        {
          time: ['2024-08-31T02:13:40.186Z', '2024-09-02T22:30:40.186Z'],
          price: {
            carriage2: 1761,
            carriage4: 2085,
            carriage6: 872,
            carriage5: 2315,
            carriage3: 1422,
          },
        },
        {
          time: ['2024-09-02T23:27:40.186Z', '2024-09-05T21:28:40.186Z'],
          price: {
            carriage2: 845,
            carriage4: 2253,
            carriage6: 1509,
            carriage5: 139,
            carriage3: 718,
          },
        },
        {
          time: ['2024-09-05T22:02:40.186Z', '2024-09-08T12:26:40.186Z'],
          price: {
            carriage2: 1634,
            carriage4: 2449,
            carriage6: 1800,
            carriage5: 1325,
            carriage3: 229,
          },
        },
        {
          time: ['2024-09-08T12:35:40.186Z', '2024-09-09T17:09:40.186Z'],
          price: {
            carriage2: 584,
            carriage4: 2434,
            carriage6: 1690,
            carriage5: 2356,
            carriage3: 562,
          },
        },
        {
          time: ['2024-09-09T17:14:40.186Z', '2024-09-12T17:04:40.185Z'],
          price: {
            carriage2: 1892,
            carriage4: 2069,
            carriage6: 2096,
            carriage5: 549,
            carriage3: 1737,
          },
        },
        {
          time: ['2024-09-12T17:21:40.185Z', '2024-09-15T19:22:40.185Z'],
          price: {
            carriage2: 1626,
            carriage4: 1569,
            carriage6: 2179,
            carriage5: 1617,
            carriage3: 510,
          },
        },
        {
          time: ['2024-09-15T19:58:40.185Z', '2024-09-19T09:29:40.185Z'],
          price: {
            carriage2: 1471,
            carriage4: 2466,
            carriage6: 864,
            carriage5: 1685,
            carriage3: 2479,
          },
        },
        {
          time: ['2024-09-19T09:49:40.185Z', '2024-09-22T05:47:40.185Z'],
          price: {
            carriage2: 1748,
            carriage4: 121,
            carriage6: 1387,
            carriage5: 888,
            carriage3: 317,
          },
        },
        {
          time: ['2024-09-22T06:13:40.185Z', '2024-09-23T20:00:40.185Z'],
          price: {
            carriage2: 791,
            carriage4: 593,
            carriage6: 1337,
            carriage5: 1838,
            carriage3: 948,
          },
        },
        {
          time: ['2024-09-23T20:36:40.185Z', '2024-09-27T05:34:40.185Z'],
          price: {
            carriage2: 1164,
            carriage4: 2422,
            carriage6: 321,
            carriage5: 1472,
            carriage3: 2112,
          },
        },
        {
          time: ['2024-09-27T06:22:40.185Z', '2024-09-30T02:53:40.185Z'],
          price: {
            carriage2: 1300,
            carriage4: 1428,
            carriage6: 1180,
            carriage5: 233,
            carriage3: 1725,
          },
        },
        {
          time: ['2024-09-30T03:19:40.185Z', '2024-10-01T13:19:40.185Z'],
          price: {
            carriage2: 1531,
            carriage4: 506,
            carriage6: 256,
            carriage5: 1737,
            carriage3: 1215,
          },
        },
        {
          time: ['2024-10-01T13:39:40.185Z', '2024-10-05T04:37:40.185Z'],
          price: {
            carriage2: 2000,
            carriage4: 915,
            carriage6: 2365,
            carriage5: 1662,
            carriage3: 622,
          },
        },
        {
          time: ['2024-10-05T05:08:40.185Z', '2024-10-07T22:15:40.184Z'],
          price: {
            carriage2: 226,
            carriage4: 2146,
            carriage6: 1056,
            carriage5: 527,
            carriage3: 1062,
          },
        },
        {
          time: ['2024-10-07T23:15:40.184Z', '2024-10-09T00:57:40.184Z'],
          price: {
            carriage2: 1307,
            carriage4: 337,
            carriage6: 467,
            carriage5: 2175,
            carriage3: 938,
          },
        },
        {
          time: ['2024-10-09T01:52:40.184Z', '2024-10-11T04:44:40.184Z'],
          price: {
            carriage2: 385,
            carriage4: 1862,
            carriage6: 2378,
            carriage5: 456,
            carriage3: 2405,
          },
        },
        {
          time: ['2024-10-11T05:06:40.184Z', '2024-10-12T17:13:40.184Z'],
          price: {
            carriage2: 868,
            carriage4: 769,
            carriage6: 162,
            carriage5: 410,
            carriage3: 201,
          },
        },
        {
          time: ['2024-10-12T18:02:40.184Z', '2024-10-15T23:17:40.184Z'],
          price: {
            carriage2: 1983,
            carriage4: 802,
            carriage6: 452,
            carriage5: 1432,
            carriage3: 2433,
          },
        },
        {
          time: ['2024-10-15T23:26:40.184Z', '2024-10-17T15:23:40.184Z'],
          price: {
            carriage2: 2050,
            carriage4: 1906,
            carriage6: 2026,
            carriage5: 956,
            carriage3: 623,
          },
        },
        {
          time: ['2024-10-17T16:17:40.184Z', '2024-10-20T08:22:40.183Z'],
          price: {
            carriage2: 1557,
            carriage4: 1379,
            carriage6: 811,
            carriage5: 2140,
            carriage3: 514,
          },
        },
        {
          time: ['2024-10-20T09:17:40.183Z', '2024-10-23T07:40:40.183Z'],
          price: {
            carriage2: 776,
            carriage4: 2274,
            carriage6: 1110,
            carriage5: 1314,
            carriage3: 1250,
          },
        },
        {
          time: ['2024-10-23T08:30:40.183Z', '2024-10-26T19:05:40.183Z'],
          price: {
            carriage2: 661,
            carriage4: 1215,
            carriage6: 605,
            carriage5: 1130,
            carriage3: 1053,
          },
        },
        {
          time: ['2024-10-26T19:39:40.183Z', '2024-10-29T11:45:40.182Z'],
          price: {
            carriage2: 2250,
            carriage4: 219,
            carriage6: 2258,
            carriage5: 553,
            carriage3: 456,
          },
        },
        {
          time: ['2024-10-29T12:07:40.182Z', '2024-11-01T00:47:40.182Z'],
          price: {
            carriage2: 1013,
            carriage4: 694,
            carriage6: 2229,
            carriage5: 867,
            carriage3: 872,
          },
        },
        {
          time: ['2024-11-01T01:10:40.182Z', '2024-11-01T17:27:40.182Z'],
          price: {
            carriage2: 2076,
            carriage4: 408,
            carriage6: 2201,
            carriage5: 1701,
            carriage3: 169,
          },
        },
        {
          time: ['2024-11-01T17:41:40.182Z', '2024-11-05T00:06:40.182Z'],
          price: {
            carriage2: 2062,
            carriage4: 1392,
            carriage6: 2489,
            carriage5: 1969,
            carriage3: 2483,
          },
        },
      ],
    },
    status: 'rejected',
  },
  {
    id: 2,
    userId: 1,
    routeId: 515,
    rideId: 1827,
    seatId: 40,
    path: [
      3, 27, 86, 24, 12, 17, 100, 21, 49, 44, 16, 10, 43, 103, 23, 36, 2, 1,
    ],
    carriages: [
      'carriage3',
      'carriage6',
      'carriage5',
      'carriage2',
      'carriage3',
      'carriage5',
      'carriage6',
      'carriage2',
      'carriage5',
      'carriage5',
      'carriage2',
      'carriage2',
      'carriage6',
      'carriage1',
      'carriage4',
      'carriage4',
      'carriage1',
      'carriage4',
      'carriage5',
      'carriage6',
      'carriage2',
    ],
    stationStart: 3,
    stationEnd: 2,
    schedule: {
      segments: [
        {
          time: ['2024-09-05T03:02:44.517Z', '2024-09-05T18:09:44.517Z'],
          price: {
            carriage3: 1357,
            carriage6: 577,
            carriage5: 531,
            carriage2: 1435,
            carriage1: 1528,
            carriage4: 1018,
          },
        },
        {
          time: ['2024-09-05T18:15:44.517Z', '2024-09-08T21:03:44.517Z'],
          price: {
            carriage3: 2072,
            carriage6: 332,
            carriage5: 778,
            carriage2: 1421,
            carriage1: 1526,
            carriage4: 820,
          },
        },
        {
          time: ['2024-09-08T21:37:44.517Z', '2024-09-11T04:02:44.517Z'],
          price: {
            carriage3: 1691,
            carriage6: 2179,
            carriage5: 1703,
            carriage2: 2269,
            carriage1: 775,
            carriage4: 857,
          },
        },
        {
          time: ['2024-09-11T04:39:44.517Z', '2024-09-13T22:55:44.517Z'],
          price: {
            carriage3: 1322,
            carriage6: 2095,
            carriage5: 2456,
            carriage2: 418,
            carriage1: 2395,
            carriage4: 2331,
          },
        },
        {
          time: ['2024-09-13T23:13:44.517Z', '2024-09-17T16:08:44.517Z'],
          price: {
            carriage3: 146,
            carriage6: 944,
            carriage5: 1277,
            carriage2: 445,
            carriage1: 2075,
            carriage4: 1599,
          },
        },
        {
          time: ['2024-09-17T16:27:44.517Z', '2024-09-20T14:21:44.517Z'],
          price: {
            carriage3: 2098,
            carriage6: 602,
            carriage5: 466,
            carriage2: 1742,
            carriage1: 2356,
            carriage4: 1522,
          },
        },
        {
          time: ['2024-09-20T15:09:44.517Z', '2024-09-21T23:05:44.517Z'],
          price: {
            carriage3: 463,
            carriage6: 1656,
            carriage5: 1307,
            carriage2: 1605,
            carriage1: 2008,
            carriage4: 332,
          },
        },
        {
          time: ['2024-09-22T00:00:44.517Z', '2024-09-25T10:15:44.517Z'],
          price: {
            carriage3: 1347,
            carriage6: 668,
            carriage5: 1534,
            carriage2: 1938,
            carriage1: 211,
            carriage4: 1577,
          },
        },
        {
          time: ['2024-09-25T11:14:44.517Z', '2024-09-29T00:53:44.517Z'],
          price: {
            carriage3: 1147,
            carriage6: 762,
            carriage5: 2494,
            carriage2: 431,
            carriage1: 2221,
            carriage4: 2426,
          },
        },
        {
          time: ['2024-09-29T01:50:44.517Z', '2024-09-29T09:27:44.517Z'],
          price: {
            carriage3: 488,
            carriage6: 525,
            carriage5: 745,
            carriage2: 1853,
            carriage1: 2351,
            carriage4: 1069,
          },
        },
        {
          time: ['2024-09-29T10:22:44.517Z', '2024-10-01T06:25:44.517Z'],
          price: {
            carriage3: 1016,
            carriage6: 931,
            carriage5: 2164,
            carriage2: 1396,
            carriage1: 113,
            carriage4: 1815,
          },
        },
        {
          time: ['2024-10-01T07:15:44.517Z', '2024-10-03T10:26:44.517Z'],
          price: {
            carriage3: 1898,
            carriage6: 1464,
            carriage5: 1009,
            carriage2: 1321,
            carriage1: 976,
            carriage4: 774,
          },
        },
        {
          time: ['2024-10-03T10:54:44.517Z', '2024-10-06T16:21:44.517Z'],
          price: {
            carriage3: 1919,
            carriage6: 334,
            carriage5: 841,
            carriage2: 852,
            carriage1: 838,
            carriage4: 733,
          },
        },
        {
          time: ['2024-10-06T16:47:44.517Z', '2024-10-09T12:36:44.517Z'],
          price: {
            carriage3: 537,
            carriage6: 916,
            carriage5: 942,
            carriage2: 767,
            carriage1: 2048,
            carriage4: 692,
          },
        },
        {
          time: ['2024-10-09T13:23:44.517Z', '2024-10-11T12:02:44.517Z'],
          price: {
            carriage3: 1027,
            carriage6: 227,
            carriage5: 929,
            carriage2: 1905,
            carriage1: 2237,
            carriage4: 1202,
          },
        },
        {
          time: ['2024-10-11T12:13:44.517Z', '2024-10-15T05:42:44.517Z'],
          price: {
            carriage3: 1227,
            carriage6: 1720,
            carriage5: 1357,
            carriage2: 2308,
            carriage1: 1171,
            carriage4: 2405,
          },
        },
        {
          time: ['2024-10-15T06:18:44.517Z', '2024-10-16T11:39:44.517Z'],
          price: {
            carriage3: 1205,
            carriage6: 512,
            carriage5: 2196,
            carriage2: 537,
            carriage1: 1602,
            carriage4: 562,
          },
        },
      ],
    },
    status: 'active',
  },
];
