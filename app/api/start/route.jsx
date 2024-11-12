import { exec } from "child_process";

export async function POST(req) {
  const { phoneNumber, otp, apiId, apiHash } = await req.json();

  if (!phoneNumber || !otp || !apiId || !apiHash) {
    return new Response(
      JSON.stringify({
        error: "Phone number, OTP, API ID, and API Hash are required",
      }),
      { status: 400 }
    );
  }

  // Command to execute the Python script
  const command = `python3 ./app/api/script.py ${apiId} ${apiHash} ${phoneNumber}`;

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
          JSON.stringify({ message: "Process started", output: stdout }),
          { status: 200 }
        )
      );
    });
  });
}
