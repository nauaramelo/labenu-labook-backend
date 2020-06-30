import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";

export class UserController {

  async signup(req: Request, res: Response) {
    try {
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        device: req.body.device
      }

      const passwordHash = new HashManager()
      const hash = await passwordHash.hash(userData.password)
      const idCreator = new IdGenerator()
      const id = idCreator.generate()
      const tokenCreator = new Authenticator()
      const token = tokenCreator.generateToken({ id }, process.env.EXPIRES_IN)

      await new UserBusiness().signup(userData.name, userData.email, id, hash)

      const refreshToken = tokenCreator.generateToken(
        {
          id,
          device: userData.device
        },
        process.env.REFRESH_TOKEN_EXPIRES_IN
      )

      const refreshTokenDb = new RefreshTokenDatabase()
      await refreshTokenDb.createRefreshToken(
        refreshToken,
        userData.device,
        true,
        id
      )
      res.status(200).send({
        acessToken: token,
        refreshToken: refreshToken
      });
    } catch (err) {
      res.status(400).send({ err: err.message });
    } finally {
      new UserDatabase().destroyConnection()
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userData = {
        email: req.body.email,
        password: req.body.password,
        device: req.body.device
      }

      if (userData.password.length < 6 || userData.email.length === 0 && !userData.email.includes("@")) {
        throw new Error('Oooops! E-mail ou senha são invalidos.');
      }

      const userDatabase: any = new UserDatabase();
      const user = await userDatabase.getUserEmail(userData.email);

      const hashManager = new HashManager();
      const comapreResult = await hashManager.compare(
        userData.password,
        user.password
      );

      if (!comapreResult) {
        throw new Error('Oooops! Senha incorreta.');
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.id,
        device: userData.device
      }, process.env.EXPIRES_IN);

      const refreshToken = authenticator.generateToken(
        {
          id: user.id,
          device: userData.device
        },
        process.env.REFRESH_TOKEN_EXPIRES_IN
      )

      const refreshTokenDatabase = new RefreshTokenDatabase()

      const refreshTokenFromDb = await refreshTokenDatabase.getRefreshTokenByUserIdAndDevice(user.id, userData.device)
      if (refreshTokenFromDb !== undefined) {
        await refreshTokenDatabase.deleteRefreshToken(refreshTokenFromDb.refreshToken)
      }

      await refreshTokenDatabase.createRefreshToken(
        refreshToken,
        userData.device,
        true,
        user.id
      )

      res.status(200).send({
        acessToken: token,
        refreshToken: refreshToken
      });


    } catch (err) {
      res.status(402).send({
        message: err.message
      });
    }
    finally {
      new UserDatabase().destroyConnection()
    }
  }

  async startNewFriendship(req: Request, res: Response) {
    try {
      const tokenCreator = new Authenticator()
      const verifyToken = tokenCreator.getData(req.headers.authorization as string)
      const userData = {
        id: req.body.id
      }
      const userManager = await new UserBusiness().addFriend(verifyToken.id, userData.id)
      res.status(200).send({
        message: 'you got a new friend!'
      })
    }
    catch (err) {
      res.status(400).send({
        message: err.message
      })
    }
    finally {
      new UserDatabase().destroyConnection()
    }
  }


  async deleteFriendship(req: Request, res: Response) {
    try {
      const tokenCreator = new Authenticator()
      const userData = {
        id: req.body.id
      }
      await new UserBusiness().deleteFriend(userData.id)
      res.status(200).send({
        message: 'Friendship finished'
      })
    }
    catch (err) {
      res.status(400).send({
        message: err.message
      })
    }
    finally {
      new UserDatabase().destroyConnection()
    }
  }
}