export const endpoints = {
    auth: {
        login: 'auth/login',
        forgotPassword: 'auth/forgot-password',
        resetPassword: 'auth/reset-password',
        verifyEmail: 'auth/verify-email',
        changePassword: 'auth/change-password',
        checkLogin: 'auth/health',
    },
    users: {
        get: "users",
        getUserApproveList: "users/approval-user-list",
        register: 'users/register',
        profile: 'users/profile',
        updateProfile: 'users/update-profile',
        updatePassword: 'user/update-password',
        checkUserExistence: 'users/check-user-existence',
        sendOtpRegistration: 'users/send-otp-registration',
        verifyOtp: 'users/verify-otp',
        addUser: 'users/create-user',
        editUser: 'users/update-user',
        deleteUser: (userId: string) => `users/delete-user?userId=${userId}`,
        resetPassword: 'users/reset-password',
        active: 'users/active',
        approve: 'users/approve',
        forgotPassword: 'users/forgot-password',
        verifyPasswordTemp: 'users/verify-temporary-password',
        updateForgotPassword: 'users/change-password-temporary',
        getApproveUsers: 'users/approve-list',
        getPermissionByPath: 'users/permission-check',
        getUserByEmail: 'users/get-user-by-email',
    },
    projects: {
        categoryTag: 'project/category-tag',
        group: 'project/group',
        deleteCategoryTag: (id: string) => `project/category-tag?id=${id}`,
        updateCategoryStatus : 'project/category-tag-status',
        posts: 'project/posts',
        approveProject: 'project/posts-approve',
        deleteProject: (postsId: string) => `project/posts?postsId=${postsId}`,
        getPostContentById: (id: string) => `project/posts/${id}`,
        updatePublishStatus: 'project/posts-publish',
        exportExcel: 'project/export',
        updateSortOrder: 'project/update/sort'
    },
    systems: {
        getRoles: 'role-permission/roles',
        pagePermissions: 'role-permission/page-permission',
        getPermissions: 'role-permission/permission',
        assignPermissions: 'role-permission/assign-permission',
        addRole: 'role-permission/create-role',
        getPermissionsByPage: 'page/permissions',
        getPages: 'page',
        getPageMenus: 'page/menus',
        editRoleStatus: 'role-permission/update/status'
    },
    upload: {
        send: 'storage/upload',
        delete: 'storage/delete'
    },
    masterdata: {
        getCodeDetails: 'masterdata/get-code-detail',
        getCountries: 'masterdata/get-countries',
        getRoles: 'masterdata/get-roles',
        getPermissions: 'masterdata/get-permissions',
        getCategoryTags: 'masterdata/category-tags',
        getUsers: 'masterdata/users',
    },
    mypage: {
        posts: 'mypage/posts',
        getPostContentById: (id: string) => `mypage/posts/${id}`,
        exportExcel: 'mypage/export',
        whishlist: 'mypage/wishlist',
        findMyPortfolio: 'mypage/portfolio',
        portfolio: 'mypage/portfolio',
        qna: {
            list: 'mypage/qna/list',
            getbyId: (qnaId: string) => `mypage/qna/${qnaId}`
        },
        proposalApply: 'mypage/proposal',
        submittedProject: {
            list: 'submittedproject/submitted-list',
            project: 'submittedproject/submitted-project'
        }
    },
    portfolio: {
        categoryTag: 'project/category-tag',
        group: 'project/group',
        deleteCategoryTag: (id: string) => `project/category-tag?id=${id}`,
        updateCategoryStatus : 'project/category-tag-status',
        general: 'project/portfolio',
        delete: (id: string) => `project/portfolio/${id}`,
        findOne: (id: string) => `project/portfolio/${id}`,
        updatePublishStatus: 'project/portfolio/publish',
        exportExcel: 'project/export',
    },
    customer: {
        qna: {
            list: 'qna/list',
            getbyId: (qnaId: string) => `qna/${qnaId}`,
            add: 'qna/add',
            update: 'qna/update',
            detail: "qna/detail",
            delete: (qnaId: string) => `qna/${qnaId}`,
            addQuestion: 'qna/question',
            deleteQuestion: (detailId: string) => `qna/answer/${detailId}`,
            addAnswer: 'qna/answer',
            editAnswer: 'qna/answer',
            deleteAnswer: (detailId: string) => `qna/answer/${detailId}`,
            exportExcel: 'qna/export',
            projectList: 'qna/project-list',
            closeQnA: 'qna/close'
        },
        contact: {
            list: 'contact/list-contact',
            delete: (contactId: string) => `contact/delete-contact/${contactId}`,
            exportExcel: 'contact/export-contact',
            editContact: 'contact/update-contact'
        }

    },
    topic: {
        name: 'topic',
        deleteTopic: (topicId: string) => `topic/${topicId}`,
        getTopicById: (topicId: string) => `topic/${topicId}`,
        updatePublishStatus: 'topic/publish',
        exportExcel: 'topic/export',
        updateSortOrder: 'topic/update/sort'
    },
}

export const routes = {
    mypage: {
        project: {
            name: 'project',
            list: 'list',
            detail: (path: string = '') => `detail${path}`,
            save: 'save',
            detailPath: '/my-page/project/detail',
            listPath: '/my-page/project/list',
            whistlistPath: '/mypage/project/save'
        },
        portfolio: {
            name: 'portfolio'
        },
        qna: {
            name: 'qna',
            list: 'list',
            listPath: '/my-page/qna',
            detail: (path: string = '') => `detail${path}`,
            detailPath: 'my-page/qna/detail',
        },
        submittedProject: {
            name: 'submitted-list',
            list: 'list',
            detail: (path: string = '') => `detail${path}`,
            detailPath: 'my-page/submitted-list/detail'
        }
    },
    project: {
        name: '/homepage',
        category: {
            name: 'category'
        },
        postedContent: {
            name: 'content',
            list: 'list',
            detail: (path: string = '') => `detail${path}`,
            detailPath: '/homepage/content/detail',
            listPath: '/homepage/content/list'
        },
        portfolio: {
            name: 'portfolio',
            list: 'list',
            listPath: '/homepage/portfolio/list',
            detailPath: '/homepage/portfolio/detail',
            detail: (path: string = '') => `detail${path}`,
        },
        topic: {
            name: 'topic',
            list: 'list',
            detail: (path: string = '') => `detail${path}`,
            detailPath: '/homepage/topic/detail',
            listPath: '/homepage/topic/list'
        },
    },
    customer: {
        name: '/customer-service',
        qna: {
            name: 'qna',
            list: 'list',
            detail: (path: string = '') => `detail${path}`,
            detailPath: 'customer-service/qna/detail',
        },
        contact: {
            name: 'contact',
            list: 'list',
            detail: (path: string = '') => `detail${path}`,
            detailPath: 'customer-service/contact/detail',  
        }
    }
}
