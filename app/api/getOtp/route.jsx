import { exec } from "child_process";

export async function POST(req) {
  const { phoneNumber } = await req.json();

  if (!phoneNumber) {
    return new Response(JSON.stringify({ error: "Phone number is required" }), {
      status: 400,
    });
  }

  // Command to execute the Python script for OTP
  const command = `python3 ./app/api/script.py ${phoneNumber}`;

  // Execute the Python script
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve(
          new Response(
            JSON.stringify({ error: "Failed to execute Python script" }),
            { status: 500 }
          )
        );
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        resolve(
          new Response(JSON.stringify({ error: stderr }), { status: 500 })
        );
      }
      resolve(
        new Response(
          JSON.stringify({ message: "OTP requested", output: stdout }),
          { status: 200 }
        )
      );
    });
  });
}
