import * as _ from 'lodash';
import * as CryptoJs from 'crypto-js';
import { MessageService } from 'primeng/api';
import AppConstant from './app-constant';
import { TranslateService } from '@ngx-translate/core';

const AppUtil = {
    toast(
        error: any,
        event: any,
        isShow: boolean = true,
        messageService?: MessageService
    ){
        if (isShow && messageService) {
            messageService.add({
                key: 'app-toast',
                severity: 'error',
                detail: error || event.body.message
            });
        }
    },
    toCamelCaseKey({ obj }: { obj: any }): any {
        if (Array.isArray(obj)) {
            return obj.map((o) => AppUtil.toCamelCaseKey({ obj: o }));
        } else if (obj && obj.constructor == Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [_.camelCase(key)]: AppUtil.toCamelCaseKey({ obj: obj[key] }),
                }), {}
            )
        }

        return obj;
    },

    toSnakeCaseKey(obj: any): any {

        if (Array.isArray(obj)) {
            return obj.map((map) => AppUtil.toSnakeCaseKey({ obj: map }));
        } else if (obj && obj.constructor == Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [_.snakeCase(key)]: AppUtil.toSnakeCaseKey(obj[key])
                }),{}
            )
        }

        return obj;       
    },

    hasMD5(text: string | CryptoJs.lib.WordArray): string {
        return CryptoJs.MD5(text).toString();
    },

    getListCity() {
        return [
            {
                id: 0,
                name: "An Giang"
            },
            {
                id: 1,
                name: "Bà Rịa – Vũng Tàu"
            },
            {
                id: 2,
                name: "Bạc Liêu"
            },
            {
                id: 3,
                name: "Bắc Giang"
            },
            {
                id: 4,
                name: "Bắc Kạn"
            },
            {
                id: 5,
                name: "Bắc Ninh"
            },
            {
                id: 6,
                name: "Bến Tre"
            },
            {
                id: 7,
                name: "Bình Dương"
            },
            {
                id: 8,
                name: "Bình Định"
            },
            {
                id: 9,
                name: "Bình Phước"
            },
            {
                id: 10,
                name: "Bình Thuận"
            },
            {
                id: 11,
                name: "Cà Mau"
            },
            {
                id: 12,
                name: "Cao Bằng"
            },
            {
                id: 13,
                name: "Cần Thơ"
            },
            {
                id: 14,
                name: "Đà Nẵng"
            },
            {
                id: 15,
                name: "Đắk Lắk"
            },
            {
                id: 16,
                name: "Đắk Nông"
            },
            {
                id: 17,
                name: "Điện Biên"
            },
            {
                id: 18,
                name: "Đồng Nai"
            },
            {
                id: 19,
                name: "Đồng Tháp"
            },
            {
                id: 20,
                name: "Gia Lai"
            },
            {
                id: 21,
                name: "Hà Giang"
            },
            {
                id: 22,
                name: "Hà Nam"
            },
            {
                id: 23,
                name: "Hà Nội"
            },
            {
                id: 24,
                name: "Hà Tĩnh"
            },
            {
                id: 25,
                name: "Hải Dương"
            },
            {
                id: 26,
                name: "Hải Phòng"
            },
            {
                id: 27,
                name: "Hậu Giang"
            },
            {
                id: 28,
                name: "Hòa Bình"
            },
            {
                id: 29,
                name: "Thành phố Hồ Chí Minh"
            },
            {
                id: 30,
                name: "Hưng Yên"
            },
            {
                id: 31,
                name: "Khánh Hòa"
            },
            {
                id: 32,
                name: "Kiên Giang"
            },
            {
                id: 33,
                name: "Kon Tum"
            },
            {
                id: 34,
                name: "Lai Châu"
            },
            {
                id: 35,
                name: "Lạng Sơn"
            },
            {
                id: 36,
                name: "Lào Cai"
            },
            {
                id: 37,
                name: "Lâm Đồng"
            },
            {
                id: 38,
                name: "Long An"
            },
            {
                id: 39,
                name: "Nam Định"
            },
            {
                id: 40,
                name: "Nghệ An"
            },
            {
                id: 41,
                name: "Ninh Bình"
            },
            {
                id: 42,
                name: "Ninh Thuận"
            },
            {
                id: 43,
                name: "Phú Thọ"
            },
            {
                id: 44,
                name: "Phú Yên"
            },
            {
                id: 45,
                name: "Quảng Bình"
            },
            {
                id: 46,
                name: "Quảng Nam"
            },
            {
                id: 47,
                name: "Quảng Ngãi"
            },
            {
                id: 48,
                name: "Quảng Ninh"
            },
            {
                id: 49,
                name: "Quảng Trị"
            },
            {
                id: 50,
                name: "Sóc Trăng"
            },
            {
                id: 51,
                name: "Sơn La"
            },
            {
                id: 52,
                name: "Tây Ninh"
            },
            {
                id: 53,
                name: "Thái Bình"
            },
            {
                id: 54,
                name: "Thái Nguyên"
            },
            {
                id: 55,
                name: "Thanh Hóa"
            },
            {
                id: 56,
                name: "Thừa Thiên Huế"
            },
            {
                id: 57,
                name: "Tiền Giang"
            },
            {
                id: 58,
                name: "Trà Vinh"
            },
            {
                id: 59,
                name: "Tuyên Quang"
            },
            {
                id: 60,
                name: "Vĩnh Long"
            },
            {
                id: 61,
                name: "Vĩnh Phúc"
            },
            {
                id: 62,
                name: "Vĩnh Phúc"
            }
        ];
    },

    getCompanySize(translate: TranslateService) {
        return [
            {
                id: AppConstant.COMPANY_SIZE.FORM_11_TO_25,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_11_TO_25}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.FORM_26_TO_50,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_26_TO_50}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.FORM_51_TO_100,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_51_TO_100}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.FORM_101_TO_1000,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.FORM_101_TO_1000}`)
            },
            {
                id: AppConstant.COMPANY_SIZE.OVER_1000,
                label: translate.instant(`SIZE.${AppConstant.COMPANY_SIZE.OVER_1000}`)
            }
        ]
    }
}

export default AppUtil;