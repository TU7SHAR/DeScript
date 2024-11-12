import sys
import argparse
from telethon import TelegramClient, sync
from telethon.tl.functions.channels import LeaveChannelRequest

parser = argparse.ArgumentParser(description='Leave Telegram Channels/Groups')
parser.add_argument('api_id', type=str, help='API ID') 
parser.add_argument('api_hash', type=str, help='API Hash') 
parser.add_argument('phone', type=str, help='Phone number') 
args = parser.parse_args()

# u can get api hash and api id from here https://my.telegram.org/apps
api_id = args.api_id 
api_hash = args.api_hash
phone = args.phone


client = TelegramClient('session_1', api_id, api_hash)

client.start(phone)

dialogs = client.get_dialogs()
found_groups_or_channels = False  

for dialog in dialogs:
    if dialog.is_channel:
        found_groups_or_channels = True  # Set the flag if a channel is found
        try:
            client(LeaveChannelRequest(dialog.entity))
            print(f"Successfully left: {dialog.name}")
        except:
            print(f"Failed to leave {dialog.name}")
if not found_groups_or_channels:
    print("You are not a member of any groups or channels.")

client.disconnect()