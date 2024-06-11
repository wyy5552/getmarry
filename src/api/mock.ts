/** 
 * 会员详情
+ 相册
  * 相册
+ 基本信息
  * 昵称
  * 姓名
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
  * ==========
  * 择偶要求
  * ==========
  * 未婚、离异、离异带娃
  * 年龄身高
  * 学历
  * 收入
  * 区域
  * 其他
 */
export type UserInfoType = {
  /** 用户的唯一标识 */
  id: number;
  /** 用户的个人相册 */
  photoAlbum: string[];
  /** 个人介绍 */
  introduction: string;
  /** 用户的昵称 */
  nickname: string;
  passwordHash?: string;
  name: string;
  /** 用户的性别，0 代表女性，1 代表男性 */
  gender: number;
  /** 用户的身高 */
  height: string;
  /** 用户的体重 */
  weight: string;
  /** 用户的生日 */
  birthday: string;
  /** 用户的年龄 */
  age: number;
  /** 用户的住房情况,0 无 1 有 */
  housing: number;
  /** 用户的购车情况 0 无 1 有*/
  carOwnership: number;
  /** 用户的婚姻状况 0 未婚 1 离异*/
  maritalStatus: number;
  /** 用户的子女情况 */
  children: string;
  /** 用户的月收入 */
  monthlyIncome: number;
  /** 用户的学历 */
  education: number;

  /** 其他说明 */
  otherInfo: string;
  /** 是否是个人填写信息 */
  isPersonalInfo: boolean;
  /** 用户的工作地区 */
  workArea: string;
  /** 用户的户籍地区 */
  registeredArea: string;
  /** 用户的职业 */
  profession: number;
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

  // 喜欢列表
  likes: string;

  // 择偶要求
  /** 婚姻状况,未婚、离异无娃、离异带娃 */
  maritalStatusRequirement: string;
  /** 年龄要求 */
  ageRequirement: string;
  /** 身高要求 */
  heightRequirement: string;
  /** 学历要求 */
  educationRequirement: string;
  /** 收入要求 */
  incomeRequirement: string;
  /** 区域要求 */
  areaRequirement: string;
  /** 其他要求 */
  otherRequirement: string;
  /** 0 否，1 是 */
  isShow: number;
  /** 是否认证 */
  isAuth: number;
};