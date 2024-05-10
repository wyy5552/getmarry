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

+ 相册
  * 相册

+ 其他信息
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
export const getUserInfo = () => {
    let userInfo = {
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

        "photoAlbum": [ // 个人相册
            "https://cdn.uviewui.com/uview/album/1.jpg",
            "https://cdn.uviewui.com/uview/album/1.jpg",
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
        "companyType": "私企", // 单位类型

    };
    return userInfo;
}

export const getUserInfoListByTag = (pageNum: number, pageSize: number) => {
    return Array.from({ length: pageSize }, (_, index) => {
        const item = getUserInfo();
        return {
            ...item,
            id: pageNum * pageSize + index + "",
        }
    });
}