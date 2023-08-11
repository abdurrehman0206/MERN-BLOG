import { render } from "../preset/react.js";
export const bridgeData = {
    "workspaceFolder": "file:///f%3A/React Projects/MERNBlog",
    "serverRootDir": "",
    "previewFolderRelPath": "preview",
    "activeFileRelPath": "frontend/src/components/Navbar/Navbar.jsx",
    "mapFileRelPath": "frontend/src/components/Navbar/Navbar.jsx",
    "presetName": "react",
    "workspaceFolderName": "MERNBlog"
};
export const preview = () => render(getMod);
const getMod = () => import("../../frontend/src/components/Navbar/Navbar.jsx");