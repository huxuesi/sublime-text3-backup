export default function() {
    return {
        "bizGroup": {
            "getBizList": '/biz/case/list',
            "getCusList": '/biz/customer/list',
            "getTeamOwner": '/biz/team/listleader',
            'getCtmList': '/biz/customer/{ctmid}/list',
            'getCtmChildList': '/biz/customer/{ctmid}/assoc/list',
            'getCaseSortData': '/biz/case/casesortdata',
            'addCustomer': '/biz/customer/{userid}/store',
        }
    }
}
