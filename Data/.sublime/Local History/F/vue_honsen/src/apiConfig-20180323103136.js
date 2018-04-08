export default function() {
    return {
        "bizGroup": {
            "getBizList": '/biz/case/list',
            "getTeamOwner": '/biz/team/listleader',
            'getCtmList': '/biz/customer/{ctmid}/list',
            'getCtmChildList': '/biz/customer/{ctmid}/assoc/list',
        }
    }
}
