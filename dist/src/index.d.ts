export declare type Address = {
    tambon: string;
    amphoe: string;
    province: string;
    zipcode: string;
};
export declare const searchAddressByTambon: (searchString: string, maxResult?: number) => Address[];
export declare const searchAddressByAmphoe: (searchString: string, maxResult?: number) => Address[];
export declare const searchAddressByProvince: (searchString: string, maxResult?: number) => Address[];
export declare const searchAddressByZipcode: (searchString: string | number, maxResult?: number) => Address[];
