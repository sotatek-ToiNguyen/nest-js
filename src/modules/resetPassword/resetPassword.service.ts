import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@modules/user/users.entity';
import { ResetPasswordEntity } from '@modules/resetPassword/resetPassword.entity'
import { Repository } from 'typeorm';
import { USER_ACTIVE, USER_TYPE, USER_INACTIVE } from '@utils/Const';
import * as bcrypt from 'bcrypt';
import { randomString } from '../../common/helperUtils.common'
const saltRounds = 10;
import { WhitelistUserService } from '@modules/whitelistUser/whitelistUser.service';

@Injectable()
export class UsersService {
    constructor(
        private whitelistUserService: WhitelistUserService,
        @InjectRepository(UsersEntity)
        private  usersModel: Repository<UsersEntity>,
    ) {}
    buildQueryBuilder(params){
        const paramObj: any = {};
        if (params.wallet_address) {
            paramObj.wallet_address = params.wallet_address
        }
        if (params.role) {
            paramObj.role = params.role
        }
        if (params.type) {
            paramObj.type = params.type
        }
        if (params.email) {
            paramObj.email = params.email
        }
        if (params.confirmation_token) {
            paramObj.confirmation_token = params.confirmation_token
        }
        if (params.is_active !== undefined) {
            paramObj.is_active = params.is_active
        }else {
            paramObj.is_active = USER_ACTIVE
        }
        return paramObj;
    }


    async getdata() {
        const user = await this.usersModel.find()
        return user;
    }

    async findUser(params){
        const builder = this.buildQueryBuilder(params);
        console.log(builder)
        const user = await this.usersModel.findOne({
            where: builder
        })
        return user;
    }

    async checkExistWhitelistUser(email){
        const whitelistUser = await this.whitelistUserService.findUser(email)
        console.log('whitelistUser', whitelistUser)
        return whitelistUser;
    }

    async createUser(params){
        try {
            const isExistWhitelistUser = await this.checkExistWhitelistUser(params.email);
            const userType = isExistWhitelistUser ? USER_TYPE.WHITELISTED : USER_TYPE.REGULAR;
            const alphaRandom: any = await randomString(50);
            const userEntity = UsersEntity.create();
            userEntity.username = params.username;
            userEntity.signature = params.signature;
            userEntity.wallet_address = params.wallet_address;
            userEntity.password = params.password;
            userEntity.email = params.email;
            userEntity.role = params.role;
            userEntity.type = userType;
            userEntity.confirmation_token = alphaRandom;
            await UsersEntity.save(userEntity);
            return userEntity;
        }catch (e) {
            console.error(e)
            throw new HttpException(e.message, 500);
        }
    }

    async confirmEmail(token, role) {
        const builder = this.buildQueryBuilder({ confirmation_token:token, role, is_active: USER_INACTIVE });
        console.log(builder)
        const user = await this.usersModel.findOne({
            where: builder
        })
        if(user){
            const builderExits = this.buildQueryBuilder({ wallet_address: user.wallet_address, role, is_active: USER_ACTIVE });
            console.log(builderExits)
            const userExist = await this.usersModel.findOne({
                where: builderExits
            })
            if (userExist) {
                return false;
            }
            user.confirmation_token = null;
            user.is_active = USER_ACTIVE;
            await this.usersModel.save(user)
            console.log('userupdate', user)

            return true;
        }else {
            return false;
        }
    }

    async resetPasswordEmail(user){
        this.usersModel.save(user);
    }
}
