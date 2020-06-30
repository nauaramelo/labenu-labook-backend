import { Request, Response } from "express"
import { Authenticator } from "../services/Authenticator"
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase"

export class RefreshAccessController {
    public refreshAccessToken = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.body.refreshToken
            const device = req.body.device

            const authenticator = new Authenticator()
            const refreshTokenData = authenticator.getData(refreshToken)
            console.log("ultimo da noite")
            console.log(refreshTokenData)
            console.log(refreshTokenData.device)
            if (refreshTokenData.device !== device) {
                throw new Error("O accesstoken não foi gerado para este dipositivo")
            }

            const accessToken = authenticator.generateToken(
                {
                    id: refreshTokenData.id,
                },
                process.env.EXPIRES_IN
            )

            res.status(200).send({
                accessToken
            })

        }
        catch (err) {
            res.status(400).send({ message: err.message })
        }
        finally {
            new RefreshTokenDatabase().destroyConnection()
        }
    }
}