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
            'delCustomer': '/biz/customer/del/{ctmids}',
            'getCaseInfo': '/biz/case/info/{caseid}',
            'getCaseFlow': '/biz/flow/{caseid}/list',
            'addCaseInfo': '/biz/case/{ctmid}/store',
            'addCaseFlow': '/biz/flow/{caseid}/store',
            'getHistoryCase': '/biz/customer/caselist/{ctmid}',
            'delCase': '/biz/case/{ctmid}/del/{caseid}',
            'getCaseAuth': '/biz/case/{ctmid}/assoc/{caseid}',
            'setCaseAuth': '/biz/case/{ctmid}/assoc/{caseid}',
            'getCustomerContacts': '/biz/customer/{ctmid}/contact/list',
            'setCaseInfo': '/biz/case/{ctmid}/store/{caseid}',
            'getCaseFlowInfo': '/biz/flow/{caseid}/list/{caseffid}/{casefid}',
            'setFlowEditing': '/biz/flow/canedit/{casefid}',
            'setFlowQuitEditing': '/biz/flow/quitedit/{casefid}',
            'addCaseFlowKeep': '/biz/flow/record/create',
            'setCaseFlowKeep': '/biz/flow/record/update',
            'delCaseFlowKeep': '/biz/flow/record/delete',
            'getCaseFlowKeep': '/biz/flow/record/recordlist',
        },
        "userGroup": {
            'getUserFollowClass': '/user/followclassify',
            'getRecentChatUser': '/chat/contacts',
        }
    }
}
