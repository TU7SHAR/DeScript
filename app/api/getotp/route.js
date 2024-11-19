import { exec } from "child_process";
import { NextResponse } from "next/server";
import path from "path";

import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req) {
  try {
    const { phoneNumber, apiId, apiHash } = await req.json();
    if (!phoneNumber || !apiId || !apiHash) {
      return NextResponse.json(
        { msg: "Required Fields are Missing!!" },
        { status: 400 }
      );
    }

    // Command to execute the Python script
    //C:/Users/gauta/Desktop/n/descriptor
    const pythonPath = path.resolve("/myenv/Scripts/python");
    const pypath = path.resolve("./app/api/script.py");
    const command = `${pythonPath} ${pypath} ${apiId} ${apiHash} ${phoneNumber}`;

    // Execute the Python script
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return NextResponse.json({ msg: stderr }, { status: 500 });
    }

    return NextResponse.json(
      {
        msg: "OTP request Forwarded to Telegram Successfully",
        output: stdout,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`exec error: ${error}`);
    return NextResponse.json(
      { msg: "Failed to execute Python script" },
      { status: 500 }
    );
  }
}
