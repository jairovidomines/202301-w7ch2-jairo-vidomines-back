import { type Request } from "express";
import { type JwtPayload } from "jsonwebtoken";
export interface RobotStructure {
  name: string;
  url: string;
  id: number;
  stats: {
    speed: number;
    endurance: number;
    creationDate: Date;
  };
}

export interface UserCredentials {
  nickname: string;
  password: string;
}

export type RobotsStructure = RobotStructure[];

export interface CustomRequest extends Request {
  ownerId: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export interface UserStructure {
  email: string;
  nickname: string;
  password: string;
  avatar: string;
}
