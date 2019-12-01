echo "Checking commit message...";
if head -1 $1 | grep -e "^GH-[0-9]\+\s";
then
  echo "Looks good!"
  exit 0;
else
  echo "Commit message is missing an issue! Message should start with GH-[issueNumber],";
  echo "but instead received: \"`cat $1`\".";
  exit 1;
fi