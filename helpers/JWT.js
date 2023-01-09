import { jwtVerify } from "jose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const userJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res
      .status(401)
      .send({
        error:"Pasado los 15 minutos no es posible cambiar la orden",
      });

  const jwt = authorization.split(" ")[1];

  if (!jwt)
  return res
  .status(401)
  .send({
    error:"Pasado los 15 minutos no es posible cambiar la orden",
  });

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt,
      encoder.encode('Medialuna1')
    );

    req.id = payload.id;

    next();
  } catch (error) {
    return res.status(401).send({ error: "Usuario no autorizado"  });
  }
};

export default userJWTDTO;
