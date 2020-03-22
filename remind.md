1、在react-native中使用react-redux和react-navigator必须安装react-navigation-redux-helpers




  #### git remote rm origin

  然后，再关联GitHub的远程库：git remote add github git@github.com:chloneda/demo.git
  然后，再关联码云的远程库：git remote add gitee git@gitee.com:chloneda/demo.git

  ### 查看远程库
    git remote -v查看远程库信息：


      gitee   git@gitee.com:chloneda/demo.git (fetch)
      gitee   git@gitee.com:chloneda/demo.git (push)
      github  git@github.com:chloneda/demo.git (fetch)
      github  git@github.com:chloneda/demo.git (push)

      可以看到两个远程库，说明配置生效了

  #### 上传代码

    git add .
    git commit -m "update"


  #### 提交到github

    git push github master

  #### 提交到github

    git push gitee master

  #### 更新代码

    # 从github拉取更新
    git pull github

    # 从gitee拉取更新
    git pull gitee