import { BaseDataBase } from "./BaseDatabase";

export class RefreshTokenDatabase extends BaseDataBase {
    tableName: string = "RefreshTokenLabook";

    public async createRefreshToken(
        token: string,
        device: string,
        isActive: boolean,
        userId: string
    ): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO RefreshTokenLabook (refresh_token, device, is_active, user_id) 
            VALUES(
                "${token}",
                "${device}",
                ${this.convertBooleanToTinyint(isActive)},
                "${userId}"
            )
        `)
    }

    public async getRefreshToken(token: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM RefreshTokenLabook 
            WHERE refresh_token = "${token}"
        `)

        const refreshTokenDb = result[0][0]

        return {
            refreshToken: refreshTokenDb.refresh_token,
            device: refreshTokenDb.device,
            userId: refreshTokenDb.user_id,
            isActive: this.convertTinyintToBoolean(refreshTokenDb.is_active)
        }
    }

    public async getRefreshTokenByUserIdAndDevice(userId: string, device: string): Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT * FROM RefreshTokenLabook 
            WHERE user_id = "${userId}" AND device = "${device}"
        `)

        const refreshTokenDb = result[0][0]

        if (refreshTokenDb === undefined) {
            return undefined
        }

        return {
            refreshToken: refreshTokenDb.refresh_token,
            device: refreshTokenDb.device,
            userId: refreshTokenDb.user_id,
            isActive: this.convertTinyintToBoolean(refreshTokenDb.is_active)
        }
    }

    public async deleteRefreshToken(token: string) {
        await this.getConnection().raw(`
            DELETE FROM RefreshTokenLabook 
            WHERE refresh_token = "${token}"
        `)
    }

    public async destroyConnection(): Promise<void> {
        await this.getConnection().destroy()
    }
}