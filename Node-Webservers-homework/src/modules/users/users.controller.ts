import { Router } from "express";
import { validateReq } from "../../shared/middlewares/validate";
import { CreateUserDto } from "./dto/create-user.dto";
import { serialize } from "../../shared/serializer";
import { UserSerializer } from "./serializers/user.serializer";
import { usersRepository } from "./users.repository";

const router = Router();

router.post("/", validateReq(CreateUserDto), (req, res) => {
    const user = usersRepository.createUser(req.body);
    res.status(201).send(serialize(UserSerializer, user));
});

router.get("/", (req, res) => {
    res.status(200).send(usersRepository.getUsersList());
});

router.get("/:id", (req, res) => {
    console.log(req.body);
    const user = usersRepository.getUserById(req.params.id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(400).send("User not found");
    }
});

router.put("/:id", validateReq(CreateUserDto), (req, res) => {
    const user = usersRepository.updateUser(req.params.id, req.body);
    if (user) {
        res.status(200).send(serialize(UserSerializer, user));
    } else {
        res.status(400).send("User not found");
    }
});

router.delete("/:id", (req, res) => {
    if (usersRepository.deleteUser(req.params.id)) {
        res.status(200).send("User deleted");
    } else {
        res.status(400).send("User not found");
    }
});

export const usersController = router;
