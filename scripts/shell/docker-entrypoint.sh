#!/bin/bash
echo "######开始执行更新脚本######"

if [ -z $CODE_DIR ]; then
  CODE_DIR=/scripts
fi

if [ -z $REPO_URL ]; then
  REPO_URL=git@gitee.com:Classmate_Lin/scripts.git
fi

if [ ! -f "/root/.ssh/id_rsa" ]; then
  echo -e "-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn\nNhAAAAAwEAAQAAAQEAo2vtKaEZRaoIJCqBNB4zU4kqhuZk4SLot66pj6dGV5Pu05RGantA\n4zjBlqDBF796XAZruG9EE22/qlGbXwHQrchuytc+ZEUfhqZdqhntMLtz/u4jyFyWHgNOxf\ncIK56m60XvXikTlNKSnOe9bL+XD1OvVua0kGqS5rzNAPXeTl2xYzpk77sWodBEHtTY7Q8n\nt9fr0zczKH2bUyTWEA3Ki4AIN6b2jxJs4h8nj4OHCDwk95RW6PnbZPyQrp671x4s/3I9/u\nxWkAELGDluAyYK04sPSoX6+dcSVCMkrYep2ueCsQL4YhweAtN8DA8qVqy3WCtrItKB+Dxv\nbKu8MmUNAQAAA9jXmHW015h1tAAAAAdzc2gtcnNhAAABAQCja+0poRlFqggkKoE0HjNTiS\nqG5mThIui3rqmPp0ZXk+7TlEZqe0DjOMGWoMEXv3pcBmu4b0QTbb+qUZtfAdCtyG7K1z5k\nRR+Gpl2qGe0wu3P+7iPIXJYeA07F9wgrnqbrRe9eKROU0pKc571sv5cPU69W5rSQapLmvM\n0A9d5OXbFjOmTvuxah0EQe1NjtDye31+vTNzMofZtTJNYQDcqLgAg3pvaPEmziHyePg4cI\nPCT3lFbo+dtk/JCunrvXHiz/cj3+7FaQAQsYOW4DJgrTiw9Khfr51xJUIySth6na54KxAv\nhiHB4C03wMDypWrLdYK2si0oH4PG9sq7wyZQ0BAAAAAwEAAQAAAQANkpIg6ftSWNvSPSF7\n9aInpvW8PHhWZnLThpMYljj2XxfvxJnQkCoEdRtG6lT/Juz/pZzetYb+4heQCrUPv/PX6x\nSgjh3lcAQ9R6Xx0bNsX7UzkA2yv1XMalPphynLjaKpWaaWuGyi6JY6p9iIpqTiJf4jBogq\nkl9fAIE6OjFbarSjUV4jwqSu0ZiPoa/6lSPpWwHNf7xinDdZtcxtX/Z1PUUeUWjMSBzygg\n/AUomfYW+XFaU0+ckVwW/yug10+peMOKRlXgoHwtj7Q9ggKUDOwY8gGQYXso8yy3tYCbkX\nuD94T7PYE9oOZGU6Vx2H3BG5k8MpetjMHvDs2nZSq18RAAAAgQCo33cVoS3YPrUOjzC2Qa\nI3fOIyvzeszo4AY3ow3KKawbTHDDiwqPdm0J+1oj6Bp62ft2TXLf148h9y/2ywQUV2LkkK\nVBcOin5am+ZZ9VK2bh2k1E1EkPUyoFTYxqgyn6hqj/aTSqHLlqhZ7JaEsDFZZw7J9NdJyl\nC07m84VahW/wAAAIEA1wXShM9hFXjPES93fOC7xFEb3lvofUIN5UZOmttknVL1JDyceNej\ncoAnTB+nEIq03/S9Vj1by6PJd27PNkqG8ET+dwyJHJ9Fg0YCVHC+IUyVlxc+Hiy86G6VJN\nl3bbn6H4+MtKdi8jZpX9Bw1NivCde8zpsX4MbzaaZjEyG7HXUAAACBAMKQq90QLrajaw1Y\nVJUuLw4/m2eCnfdmkpyDxqgsOT8JbaqSpnJZXzYV0lAPeiqtW6vlAoqWsCqVw4Dm6x8QI7\nMeb2vL8Pb5lJl0BD0s8Cr/HFMDcPXV9fQHApZbL415hW+FZhP0Tk5bL2JTBlRpXMAwvEZm\nzjq1md6zK5X2q0PdAAAAG2NsYXNzbWF0ZWxpbi5zaXRlQGdtYWlsLmNvbQECAwQFBgc=\n-----END OPENSSH PRIVATE KEY-----\n" >> /root/.ssh/id_rsa;
  chmod 600 /root/.ssh/id_rsa;
  ssh-keyscan gitee.com > /root/.ssh/known_hosts;
fi

if [ ! -d $CODE_DIR/.git ]; then
  echo "代码目录为空, 开始clone代码...";
  cd $CODE_DIR;
  git init;
  git branch -M master;
  git remote add origin $REPO_URL;
  git pull origin master;
  git branch --set-upstream-to=origin/master master;
fi

if ! type ps >/dev/null 2>&1; then
  echo "正在安装procps..."
  apt -y install procps
  apt clean;
else
    echo "procps 已安装";
fi

if ! type node >/dev/null 2>&1; then
  echo "正在安装nodejs...";
  apt -y install nodejs;
  apt clean;
else
    echo "nodejs 已安装";
fi

if ! type npm >/dev/null 2>&1; then
  echo "正在安装npm...";
  apt -y install npm;
  npm install typescript -g;
  apt clean;
else
    echo "npm 已安装";
fi

if ! type chromium >/dev/null 2>&1; then
    echo "开始安装chromium...";
    apt -y install chromium;
    apt clean;
    rm -f /root/.local/share/pyppeteer;
else
    echo 'chromium 已安装';
fi

if [ ! -d $CODE_DIR/conf ]; then
  echo "配置文件目录不存在, 创建目录...";
  mkdir -p $CODE_DIR/conf;
fi

if [ ! -d $CODE_DIR/logs ]; then
  echo "日志目录不存在, 创建目录...";
  mkdir -p $CODE_DIR/logs;
fi

if [ ! -f "$CODE_DIR/conf/config.yaml" ]; then
  echo "脚本配置文件不存在, 复制配置文件...";
  cp $CODE_DIR/.config.yaml $CODE_DIR/conf/config.yaml;
fi



if [ ! -f "$CODE_DIR/conf/crontab.sh" ]; then
  echo "自定义cron配置文件不存在, 复制配置文件..."
  cp $CODE_DIR/.crontab.sh $CODE_DIR/conf/crontab.sh;
fi


echo "git pull拉取最新代码...";
cd $CODE_DIR && git reset --hard && git pull;
echo "pip install 安装最新依赖...";
pip install -r $CODE_DIR/requirements.txt;
echo "更新docker-entrypoint...";
cp $CODE_DIR/shell/docker-entrypoint.sh /bin/docker-entrypoint;
chmod a+x /bin/docker-entrypoint;
chmod a+x /scripts/*.py;

echo "更新cron任务..."
crontab -r;
python $CODE_DIR/tools/update_config.py;
python $CODE_DIR/tools/update_default_crontab.py;

# 更新js库
python $CODE_DIR/update_nodejs.py;

cat $CODE_DIR/shell/default_crontab.sh > /tmp/crontab;
echo -e "\n" >> /tmp/crontab;

cat $CODE_DIR/conf/crontab.sh >> /tmp/crontab;

if [ ! -f "/scripts/logs/pyjs.lock" ]; then
  echo "export PATH='/scripts:$PATH'" >> /etc/profile;
  source /etc/profile;
  echo "export PATH='/scripts:$PATH'" >> ~/.bashrc;
  echo "lock" > /scripts/logs/pyjs.lock;
fi

crontab /tmp/crontab;

rm /tmp/crontab;

echo "重启cron进程...";

/etc/init.d/cron restart;

echo "######更新脚本执行完毕######";


# 保证容器不退出
tail -f /dev/null;
