export default function() {
    return {
        "bizGroup": {
            "getBizList": '/biz/case/list',
            "getCusList": '/biz/customer/list',
            "getTeamOwner": '/biz/team/listleader',
            'getCtmList': '/biz/customer/{ctmid}/list',
            'getCtmChildList': '/biz/customer/{ctmid}/assoc/list',
            'getCaseSortData': '/biz/case/casesortdata',
            'getCusSortData': '/biz/customer/customersortdata',
            'addCustomer': '/biz/customer/{userid}/store',
            'addCaseInfo': '/biz/case/{ctmid}/store',
            'getHistoryCase': '/biz/customer/caselist/{ctmid}',
            'delCase': '/biz/case/{ctmid}/del/{caseid}',
            'getCaseAuth': '/biz/case/{ctmid}/assoc/{caseid}',
            'setCaseAuth': '/biz/case/{ctmid}/assoc/{caseid}',
        },
        "userGroup": {
            'getUserFollowClass': '/user/followclassify',
        }
    }
}
