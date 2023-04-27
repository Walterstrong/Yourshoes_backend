const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const assert = require("assert");
const Definer = require("../lib/ mistake");
const TelegramBot = require("node-telegram-bot-api");
const token = "6234486072:AAEL9t9dG2nfWfaESgq4oU5qB2Gew__6w6s";
const bot = new TelegramBot(token, { polling: false });
const ADMIN_CHAT_ID = "406798569";

let memberController = module.exports;

//

memberController.signup = async (req, res) => {
  try {
    console.log("POST:cont/signup");
    const data = req.body;

    const member = new Member();
    const new_member = await member.signupData(data);

    const token = memberController.createToken(new_member);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });
    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR, cont/signup, ${err.message}`);
    if (err.message === "mb_nick is already in use") {
      res.status(400).json({ state: "fail", message: Definer.auth_err6 });
    } else {
      res.status(500).json({ state: "fail", message: "Internal Server Error" });
    }
  }
};

//

memberController.login = async (req, res) => {
  try {
    console.log("POST:cont/login");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

    const token = memberController.createToken(result);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//

memberController.createToken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };

    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err2);
    return token;
  } catch (err) {
    throw err;
  }
};

//

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("POST:cont/checkMyAuthentication");

    let token = req.cookies["access_token"];

    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err2);

    res.json({ state: "success", data: member });
  } catch (err) {
    throw err;
  }
};

//

memberController.logout = (req, res) => {
  console.log("POST:cont/logout");
  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
  res.json({ state: "success", data: "logout successfully" });
};

//

memberController.getChosenMember = async (req, res) => {
  try {
    console.log("POST:cont/ChosenMember");
    const id = req.params.id;

    const member = new Member();
    const result = await member.getChosenMemberData(req.member, id);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/ChosenMember, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

//

memberController.retrieveAuthMember = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err) {
    console.log(`ERROR, cont/retrieveAuthMember, ${err.message}`);
    next();
  }
};

//

memberController.likeMemberChosen = async (req, res) => {
  try {
    console.log("POST:cont/likeMemberChosen:", req.body);
    const mb_nick = req.member.mb_nick;
    const type = req.body.group_type;
    const ref_id = req.body.like_ref_id;

    bot
      .sendMessage(
        ADMIN_CHAT_ID,
        `user "${mb_nick}" liked "${ref_id}" which is  "${type}"`
      )
      .then(() => console.log("Message sent to admin via Telegram bot"))
      .catch((err) =>
        console.error("Error sending message via Telegram bot:", err)
      );
    assert.ok(req.member, Definer.auth_err5);
    const member = new Member();
    const like_ref_id = req.body.like_ref_id;
    const group_type = req.body.group_type;

    const result = await member.likeChosenItemByMember(
      req.member,
      like_ref_id,
      group_type
    );
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/likeMemberChosen, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.updateMember = async (req, res) => {
  try {
    console.log("POST:cont/updateMember");
    assert.ok(req.member, Definer.auth_err3);
    const member = new Member();
    const result = await member.updateMemberData(
      req.member?._id,
      req.body,
      req.file
    );

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR, cont/updateMember, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// import React, {
//   useState,
//   useContext,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
// import { Avatar, Box, Button, Stack } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { SocketContext } from "app/context/socket";
// import { ChatGreetMsg, ChatInforMsg, ChatMessage } from "types/others";
// import { verifiedMemberData } from "app/apiServices/verify";
// import { sweetErrorHandling, sweetFailureProvider } from "app/lib/sweetAlert";
// import assert from "assert";
// import { Definer } from "app/lib/Definer";
// import { RippleBadge } from "app/MaterialTheme/styled";
// import CloseIcon from "@mui/icons-material/Close";
// import { useSpring } from "react-spring";
// import ReactScrollableFeed from "react-scrollable-feed";
// import Fade from "react-reveal/Fade";
// import Bounce from "react-reveal/Bounce";
// import useDeviceDetect from "app/lib/responsive/useDeviceDetect";
// import useSound from "use-sound";
// import yourSoundFile from "../../../assets/audio/your-sound-file.mp3";
// import Badge from "@mui/material/Badge";
// const NewMessage = (data: any) => {
//   if (data.new_message.mb_id == verifiedMemberData?._id) {
//     return (
//       <Box
//         flexDirection={"row"}
//         style={{ display: "flex" }}
//         alignItems={"flex-end"}
//         justifyContent={"flex-end"}
//         sx={{ m: "10px 10px" }}
//       >
//         <div className={"msg_right"}> {data.new_message.msg}</div>
//       </Box>
//     );
//   } else {
//     return (
//       <Box
//         flexDirection={"row"}
//         style={{ display: "flex" }}
//         sx={{ m: "10px 0px" }}
//       >
//         <Avatar
//           alt={data.new_message.mb_nick}
//           src={data.new_message.mb_image}
//         />
//         <div className={"msg_left"}>{data.new_message.msg}</div>
//       </Box>
//     );
//   }
// };

// export function CommunityChats(props: any) {
//   /** INITIALIZATIONSS **/
//   const [messagesList, setMessagesList] = useState([]);
//   const socket = useContext(SocketContext);
//   const [onlineUsers, setOnlineUsers] = useState<number>(0);
//   const textInput: any = useRef(null);
//   const [message, setMessage] = useState<string>("");
//   const [shouldPlaySound, setShouldPlaySound] = useState(false);

//   const chatContentRef = useRef<HTMLDivElement>(null);
//   const [open, setOpen] = useState(false);
//   const [openButton, setOpenButton] = useState(false);
//   const { isMobile } = useDeviceDetect();
//   const [playSound] = useSound(yourSoundFile);
//   const audio = new Audio(yourSoundFile);
//   const [firstMessageReceived, setFirstMessageReceived] = useState(false);
//   const [firstMessageClosed, setFirstMessageClosed] = useState(false);

//   // const [playedFirstSound, setPlayedFirstSound] = useState(false); // new state variable
//   // const [messageCounter, setMessageCounter] = useState(0); // new state variable
//   const [unreadMessages, setUnreadMessages] = useState<number>(0);
//   const [autoOpenChat, setAutoOpenChat] = useState(true);
//   const [manuallyClosed, setManuallyClosed] = useState(false);

//   const handleOpenChat = () => {
//     setOpen((prevState) => !prevState);
//     if (open) {
//       setUnreadMessages(0);
//       setManuallyClosed(true);
//     }
//   };
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setOpenButton(true);
//       // setOpen(true);
//     }, 5000);
//     return () => clearTimeout(timeoutId);
//   }, []);

//   // ... Other code ...
//   // ... Other code ...

//   useEffect(() => {
//     socket.connect();
//     console.log("SOCKET CONNECTED");

//     socket?.on("connect", function () {
//       console.log("CLIENT: connected!");
//     });

//     socket?.on("newMsg", function (new_message: ChatMessage) {
//       console.log("CLIENT: new message!");
//       messagesList.push(
//         // @ts-ignore
//         <NewMessage new_message={new_message} key={messagesList.length} />
//       );
//       setMessagesList([...messagesList]);

//       if (!open && new_message.mb_id !== verifiedMemberData?._id) {
//         setUnreadMessages((prevCount) => prevCount + 1);
//         if (!manuallyClosed) {
//           audio.play();
//           setOpen(true);
//         }
//       }
//     });

//     socket?.on("greetMsg", function (msg: ChatGreetMsg) {
//       console.log("CLIENT: greet message!");
//       messagesList.push(
//         // @ts-ignore
//         <p
//           style={{
//             textAlign: "center",
//             fontSize: "large",
//             fontFamily: "serif",
//           }}
//         >
//           {msg.text}, dear {verifiedMemberData?.mb_nick ?? "guest"}
//         </p>
//       );
//       setMessagesList([...messagesList]);
//     });

//     socket?.on("infoMsg", function (msg: ChatInforMsg) {
//       console.log("CLIENT: info message!");
//       setOnlineUsers(msg.total);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   // ... Rest of the code ...

//   // ... Rest of the code ...

//   //**HANDLERS */
//   const getInputMessageHandler = useCallback(
//     (e: any) => {
//       const text = e.target.value;
//       setMessage(text);
//     },
//     [message]
//   );

//   const getKeyHandler = (e: any) => {
//     try {
//       if (e.key === "Enter") {
//         assert.ok(message, Definer.input_err3);
//         onClickHandler();
//       }
//     } catch (err: any) {
//       sweetErrorHandling(err).then();
//     }
//   };
//   const onClickHandler = () => {
//     try {
//       if (!verifiedMemberData) {
//         textInput.current.value = "";
//         sweetFailureProvider("Please login first", true);
//         return false;
//       }

//       textInput.current.value = "";
//       assert.ok(message, Definer.input_err3);

//       const mb_image_url =
//         verifiedMemberData?.mb_image ?? "/auth/default_user.svg";

//       socket.emit("createMsg", {
//         msg: message,
//         mb_id: verifiedMemberData?._id,
//         mb_nick: verifiedMemberData?.mb_nick,
//         mb_image: mb_image_url,
//       });
//       setMessage("");
//     } catch (err: any) {
//       console.log("onClickHandler, Error:", err);
//       sweetErrorHandling(err).then();
//     }
//   };

//   if (!isMobile()) {
//     return (
//       <Stack className="chatting">
//         {openButton ? (
//           <Button className={"chat_button"} onClick={handleOpenChat}>
//             {open ? <CloseIcon /> : <MarkChatUnreadIcon />}{" "}
//             <Badge color="secondary" badgeContent={unreadMessages}></Badge>
//           </Button>
//         ) : null}

//         <Stack className={"chat_frame3"}>
//           <Stack className={`chat_frame ${open ? "open" : ""}`}>
//             <Fade right>
//               <Stack>
//                 <Box className={"chat_top"}>
//                   <div>Live chatting</div>
//                   <RippleBadge
//                     style={{ margin: "-30px 0 0 20px", color: "white" }}
//                     badgeContent={onlineUsers}
//                   />
//                 </Box>
//                 <Box
//                   className={"chat_content"}
//                   id="chat_content"
//                   ref={chatContentRef}
//                 >
//                   <ReactScrollableFeed>
//                     <Stack className={"chat_main"}>
//                       <Box
//                         flexDirection={"row"}
//                         style={{ display: "flex" }}
//                         sx={{ m: "10px 0px" }}
//                       >
//                         <div className={"msg_left"}>Live chatting</div>
//                       </Box>
//                       {messagesList}
//                     </Stack>
//                   </ReactScrollableFeed>
//                 </Box>
//                 <Box className={"chat_bott"}>
//                   <input
//                     ref={textInput}
//                     type={"text"}
//                     name={"message"}
//                     className={"msg_input"}
//                     placeholder={"Type message"}
//                     onKeyDown={getKeyHandler}
//                     onChange={(e) => {
//                       getInputMessageHandler(e);
//                     }}
//                   />
//                   <button className={"send_msg_btn"} onClick={onClickHandler}>
//                     <SendIcon style={{ color: "#fff" }} />
//                   </button>
//                 </Box>
//               </Stack>
//             </Fade>
//           </Stack>
//         </Stack>
//       </Stack>
//     );
//   } else {
//     return null;
//   }
// }
