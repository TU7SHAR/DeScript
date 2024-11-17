import sys
import argparse
from telethon import TelegramClient, sync
from telethon.errors import SessionPasswordNeededError
from telethon.tl.functions.channels import LeaveChannelRequest
from telethon.tl.functions.auth import LogOutRequest
import codecs
import locale

# Set the default encoding to UTF-8
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

# Set up argument parsing
parser = argparse.ArgumentParser(description='Leave Telegram Channels/Groups')
parser.add_argument('api_id', type=str, help='API ID')
parser.add_argument('api_hash', type=str, help='API Hash')
parser.add_argument('phone', type=str, help='Phone number')
parser.add_argument('otp', type=str, help='OTP')

args = parser.parse_args()

# Get arguments
api_id = args.api_id
api_hash = args.api_hash
phone = args.phone
otp = args.otp

client = TelegramClient('session_1', api_id, api_hash)

client.connect()

if not client.is_user_authorized():
    try:
        client.send_code_request(phone)
        client.sign_in(phone, otp)
    except SessionPasswordNeededError:
        print("Two-step verification is enabled. Please provide your password.")
        sys.exit(1)
    except Exception as e:
        print(f"Failed to sign in: {str(e)}")
        sys.exit(1)

dialogs = client.get_dialogs()
found_groups_or_channels = False
output = ""

for dialog in dialogs:
    if dialog.is_channel:
        found_groups_or_channels = True  # Set the flag if a channel is found
        try:
            client(LeaveChannelRequest(dialog.entity))
            output += (f"Successfully left: {dialog.name}\n")
        except Exception as e:
            print(f"Failed to leave {dialog.name}: {str(e)}")

if not found_groups_or_channels:
    print("You are not a member of any groups or channels.")

print(output)
client.log_out()
client.disconnect()
