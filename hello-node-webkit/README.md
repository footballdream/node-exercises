
hello node-webkit
===============================

学习使用 [node-webkit](https://github.com/rogerwang/node-webkit) 的项目。

## 步骤

1. 安装 Node.js 及 npm

略

2. 安装 [yeoman](http://yeoman.io/)


    npm install -g yo grunt-cli bower

3. 安装 [generator-node-webkit](https://github.com/Dica-Developer/generator-node-webkit)

这是一个在 yo 下的模板模块，类似于 maven 中的原型。

    npm install -g generator-node-webkit

4. 创建项目


    mkdir hello-node-webkit
    cd hello-node-webkit
    yo node-webkit

会询问相关问题，回答后，开始创建模板工程，因为要下载 node-webkit，会需要一点时间。

5. 构建运行


    grunt dist-mac && dist/helloNodeWebkit.app/Contents/MacOS/node-webkit

不过，首次构建并不顺利，显示

    ...
    >> 118 errors in 3 files
    Warning: Task "jshint:files" failed. Use --force to continue.

    Aborted due to warnings.
    ...

信息显示 `jshint:files` 任务出了太多错误，原因是对很多引用的第三库进行代码检查的时候
未能通过。看来代码质量的提升是一个持续不断的过程。

为了通过，直接略过 `jshint:files` 任务：

    ...
    grunt.registerTask('dist-mac', [
      // 'jshint',
    ...

重新运行，成功：

    grunt dist-mac && dist/helloNodeWebkit.app/Contents/MacOS/node-webkit
