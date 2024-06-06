// 定义枚举数据
export const sexOptions = [
    { text: '女', value: 0 },
    { text: '男', value: 1 }
];
/** 婚姻状态 */
export const maritalStatusOptions = [
    { text: '未婚', value: 0 },
    { text: '离异无娃', value: 1 },
    { text: '离异带男娃', value: 2 },
    { text: '离异带女娃', value: 3 }
];
/** 教育 */
export const educationOptions = [
    { text: '初中', value: 0 },
    { text: '高中', value: 1 },
    { text: '大专', value: 2 },
    { text: '本科', value: 3 },
    { text: '研究生', value: 4 },
    { text: '博士', value: 5 },
    { text: '博士后', value: 6 }
];
/** 职业 */
export const professionOptions = [
    { text: '计算机/互联网/通信', value: 0 },
    { text: '生产/工艺/制造', value: 1 },
    { text: '商业/服务业/个体经营', value: 2 },
    { text: '金融/银行/投资/保险', value: 3 },
    { text: '文化/广告/传媒', value: 4 },
    { text: '娱乐/艺术/表演', value: 5 },
    { text: '医疗/护理/制药', value: 6 },
    { text: '律师/法务', value: 7 },
    { text: '教育/科研/培训', value: 8 },
    { text: '公务员/事业单位', value: 9 },
    { text: '模特', value: 10 },
    { text: '空姐', value: 11 },
    { text: '学生', value: 12 },
    { text: '其他', value: 13 }
];
/** 期望结婚时间 */
export const marriageTimeOptions = [
    { text: '半年内', value: 0 },
    { text: '一年内', value: 1 }
];

export const housingOptions = [
    { text: '无', value: 0 },
    { text: '有', value: 1 },
    { text: '自建', value: 2 }
];

export const carOwnershipOptions = [
    { text: '无', value: 0 },
    { text: '有', value: 1 }
];

export const personalInfoOptions = [
    { text: '否', value: 0 },
    { text: '是', value: 1 }
];

/** 
 * 根据枚举获取性别男女 
 */
export const getGenderLabel = (value, type: 'text' | 'icon' = "text") => {
    const temp = sexOptions.find(item => item.value === value);
    if (type === "text") {
        return temp?.text;
    }
    else {
        return temp?.value == 0 ? "♀" : "♂";
    }
}
/** 
 * 根据枚举获取婚姻状态
 */
export const getMaritalStatusLabel = (value) => {
    return maritalStatusOptions.find(item => item.value === value)?.text;
};
/**
 * 根据枚举获取学历
 */
export const getEducationLabel = (value) => {
    return educationOptions.find(item => item.value === value)?.text;
}
/**
 * 根据枚举获取职业
 */
export const getProfessionLabel = (value) => {
    return professionOptions.find(item => item.value === value)?.text;
}
/**
 * 根据枚举获取期望结婚时间
 */
export const getMarriageTimeLabel = (value) => {
    return marriageTimeOptions.find(item => item.value === value)?.text;
}

/**
 * 根据枚举获取住房情况
 */
export const getHousingLabel = (value) => {
    return housingOptions.find(item => item.value === value)?.text;
}
/**
 * 根据枚举获取车辆情况
 */
export const getCarOwnershipLabel = (value) => {
    return carOwnershipOptions.find(item => item.value === value)?.text;
}
/**
 * 是否个人填写
 */
export const getPersonalInfoLabel = (value) => {
    return personalInfoOptions.find(item => item.value === value)?.text;
}
/** 
 * 根据日期获取年龄
 */
export const getAge = (date) => {
    const birth = new Date(date);
    const now = new Date();
    const diff = now.getTime() - birth.getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}
export default {
    sexOptions,
    maritalStatusOptions,
    educationOptions,
    professionOptions,
    marriageTimeOptions,
    housingOptions,
    carOwnershipOptions,
    personalInfoOptions,
    getGenderLabel,
    getMaritalStatusLabel,
    getEducationLabel,
    getProfessionLabel,
    getMarriageTimeLabel,
    getHousingLabel,
    getCarOwnershipLabel,
    getPersonalInfoLabel,
    getAge
};