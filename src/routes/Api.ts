/**
 * Define all your API web-routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Router } from "express";
import * as expressJwt from "express-jwt";

import Locals from "../providers/Locals";

import HomeController from "../controllers/Api/Home";
import LoginController from "../controllers/Api/Auth/Login";
import RegisterController from "../controllers/Api/Auth/Register";
import RefreshTokenController from "../controllers/Api/Auth/RefreshToken";
import PublicPhotos from "../controllers/Api/PublicPhotos";

const router = Router();

router.get("/", HomeController.index);

router.get("/public-photos", PublicPhotos.index);

export default router;
