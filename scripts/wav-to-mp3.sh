#!/bin/bash

output_path=""
input_path=""

# Parse command line options
while getopts "o:" opt; do
  case $opt in
    o)
      output_path="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# Shift the parsed options out of the argument list
shift $((OPTIND-1))

# Get the text argument
if [ $# -eq 0 ]; then
  echo "Error: Text argument is required."
  exit 1
fi

input_path="$1"

if [ -z "$output_path" ]; then
  output_path="${input_path%.wav}.mp3"
fi

ffmpeg -i "$input_path" -acodec libmp3lame -ab 192k "$output_path"

echo "Conversion complete. Output saved to: $output_path"
rm "$input_path"