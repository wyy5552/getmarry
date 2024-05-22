export const getVipList = () => {
    return Array.from({ length: 10 }, (_, index) => {
        const item = getUserInfo();
        return {
            ...item,
            id: index + "",
        }
    });
}
/** 
 * 会员详情
+ 相册
  * 相册
+ 基本信息
  * 昵称
  * 年龄
  * 性别
  * 身高
  * 体重
  * 月收入
  * 住房
  * 购车情况
  * 户籍地区
  * 学历
  * 职业
  * 婚姻状况
  * 子女情况
  * 房产位置
  * 工作地区
  * 期望结婚时间
  * 兄弟姐妹
  * 兴趣爱好
  * 工作行业
  * 单位类型

 */
export type UserInfoType = {
    /** 用户的唯一标识 */
    id: string;
    /** 用户的个人相册 */
    photoAlbum: string[];
    /** 个人介绍 */
    introduction: string;
    /** 用户的昵称 */
    nickname: string;
    /** 用户的性别，0 代表女性，1 代表男性 */
    gender: number;
    /** 用户的身高 */
    height: string;
    /** 用户的体重 */
    weight: string;
    /** 用户的生日 */
    birthday: string;
    /** 用户的住房情况,0 无 1 有 */
    housing: string;
    /** 用户的购车情况 0 无 1 有*/
    carOwnership: string;
    /** 用户的婚姻状况 0 未婚 1 离异*/
    maritalStatus: string;
    /** 用户的子女情况 */
    children: string;
    /** 用户的月收入 */
    monthlyIncome: string;
    /** 用户的学历 */
    education: string;

    /** 其他说明 */
    otherInfo: string;
    /** 是否是个人填写信息 */
    isPersonalInfo: boolean;
    /** 用户的工作地区 */
    workArea: string;
    /** 用户的户籍地区 */
    registeredArea: string;
    /** 用户的职业 */
    profession: string;
    /** 用户的房产位置 */
    propertyLocation: string;
    /** 用户的期望结婚时间 */
    expectedMarriageTime: string;
    /** 用户的兄弟姐妹 */
    siblings: string;
    /** 用户的兴趣爱好 */
    hobbies: string;
    /** 用户的工作行业 */
    industry: string;
    /** 用户的单位类型 */
    companyType: string;
    /** 红娘点评 */
    matchmakerComment: string;

    /** 用户的手机号 */
    phone: string;
    /** 用户的微信号 */
    wechat: string;
    /** 红娘手机号 */
    matchmakerPhone: string;
    /** 红娘微信 */
    matchmakerWechat: string;
    /**机构id */
    organizationId: string;
};
/** 获取单个用户信息 */
export const getUserInfo = () => {
    let userInfo: UserInfoType = {
        "id": "id",
        "nickname": "德玛西亚", // 昵称 手动输入
        "birthday": "1990-01-01", // 生日
        "gender": 0, // 性别 0 女 1 男 选项
        "height": "180", // 身高 手动输入
        "weight": "70", // 体重 手动输入
        "monthlyIncome": "10000", // 月收入 手动输入
        "housing": "自建", // 住房，手动输入
        "carOwnership": "奥迪", // 购车情况
        "workArea": "上海", // 工作地区
        "registeredArea": "周口", // 户籍地区
        "education": "本科", // 学历

        "photoAlbum": [
            "https://cdn.uviewui.com/uview/album/1.jpg"
        ],

        "profession": "公务员", // 职业

        "maritalStatus": "未婚", // 婚姻状况
        "children": "无", // 子女情况
        "propertyLocation": "上海", // 房产位置
        "expectedMarriageTime": "半年内", // 期望结婚时间
        "siblings": "三兄弟", // 兄弟姐妹
        "hobbies": "吃喝嫖赌", // 兴趣爱好
        "industry": "电子厂", // 工作行业
        "companyType": "私企",
        phone: "13381700000",
        wechat: "wyy5552",
        matchmakerPhone: "13381700001",
        organizationId: "1",
        introduction: "我是一只鸡呀呀呀呀呀",
        matchmakerComment: "人不错，可以考虑",
        isPersonalInfo: false,
        otherInfo: "这是其他信息",
        matchmakerWechat: "红娘微信"
    };
    return userInfo;
}
/** 根据标签获取用户列表 */
export const getUserInfoListByTag = (pageNum: number, pageSize: number) => {
    return Array.from({ length: pageSize }, (_, index) => {
        const item = getUserInfo();
        return {
            ...item,
            id: pageNum * pageSize + index + "",
        }
    });
}
/** 获取用户收藏列表 */
export const getCollectionList = () => {
    return Array.from({ length: 10 }, (_, index) => {
        const item = getUserInfo();
        return {
            ...item,
            id: index + "",
        }
    });
}
