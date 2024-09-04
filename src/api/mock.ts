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
  /** 用户的唯一标识符。默认自增长。不能为空 */
  id: string;
  /** 用户的小家家号码。 不能为空*/
  phone: number;
  /** 用户的名字。 */
  name: string;
  /** 角色 */
  role: number;
  /** 用户的性别。 */
  gender: number;
  /** 用户的昵称。 */
  nickname: string;
  /** 用户的哈希密码。 不能为空*/
  passwordHash: string;
  /** 用户的授权级别（0代表用户，1代表小家家）。 不能为空 */
  userType: number;
  /** 组织id（邀请码）。对于用户，这是小家家的小家家号码；对于小家家，这是系统提供的id。 不能为空 */
  organizationId: number;
  /** 绑定的会员或小家家的id。 */
  userId: string;
  /** 用户的登录时间。 */
  loginTime: number;
  /** 用户的注册时间。 */
  registerTime: number;
  /** 我的邀请码(小家家号后4位） */
  code: number;

  /** 用户的个人相册 */
  photoAlbum: string[];
  /** 个人介绍 */
  introduction: string;
  /** 用户的身高 */
  height: number;
  /** 用户的体重 */
  weight: number;
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
  /** 小家家点评 */
  matchmakerComment: string;

  /** 用户的微信号 */
  wechat: string;
  /** 小家家小家家号 */
  matchmakerPhone: string;
  /** 小家家微信 */
  matchmakerWechat: string;

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
