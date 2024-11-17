import { exec } from "child_process";
import { NextResponse } from "next/server";
import util from "util";
import path from "path";

const execPromise = util.promisify(exec);

export async function POST(req) {
  try {
    const { phoneNumber, apiId, apiHash, otp } = await req.json();

    if (!phoneNumber || !apiId || !apiHash || !otp) {
      return NextResponse.json(
        { msg: "Required Fields are Missing!!" },
        { status: 400 }
      );
    }

    // Command to execute the Python script
    //  C:/Users/gauta/Desktop/n/descriptor/app/api/scriptstart.py
    const pythonPath = path.resolve("./myenv/Scripts/python");
    const pypath = path.resolve("./app/api/scriptstart.py");
    const command = `${pythonPath} ${pypath} ${apiId} ${apiHash} ${phoneNumber} ${otp}`;

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
