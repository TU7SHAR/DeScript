import sys 
import argparse
from telethon import TelegramClient, sync

# Set up argument parsing 
parser = argparse.ArgumentParser(description='Leave Telegram Channels/Groups') 
parser.add_argument('api_id', type=str, help='API ID') 
parser.add_argument('api_hash', type=str, help='API Hash') 
parser.add_argument('phone', type=str, help='Phone number')
args = parser.parse_args() 

# Get arguments 
api_id = args.api_id
api_hash = args.api_hash 
phone = args.phone 

client = TelegramClient('session_1', api_id, api_hash)
client.start(phone)

