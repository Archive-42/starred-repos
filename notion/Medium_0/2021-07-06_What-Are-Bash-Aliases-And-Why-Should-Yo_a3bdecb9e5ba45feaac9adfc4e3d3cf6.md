# 2021-07-06_What-Are-Bash-Aliases-And-Why-Should-You-Be-Using-Them--30a6cfafdfeb

# What Are Bash Aliases And Why Should You Be Using Them!

A Bash alias is a method of supplementing or overriding Bash commands with new ones. Bash aliases make it easy for users to customize their…

---

### What Are Bash Aliases And Why Should You Be Using Them!

A Bash alias is a method of supplementing or overriding Bash commands with new ones. Bash aliases make it easy for users to customize their experience in a [POSIX](https://opensource.com/article/19/7/what-posix-richard-stallman-explains) terminal. They are often defined in **$HOME/.bashrc** or **$HOME/bash_aliases** (which must be loaded by **$HOME/.bashrc**).

Most distributions add at least some popular aliases in the default **.bashrc** file of any new user account. These are simple ones to demonstrate the syntax of a Bash alias:

```
alias ls='ls -F'
alias ll='ls -lh'
```

Not all distributions ship with pre-populated aliases, though. If you add aliases manually, then you must load them into your current Bash session:

```
$ source ~/.bashrc
```

Otherwise, you can close your terminal and re-open it so that it reloads its configuration file.

With those aliases defined in your Bash initialization script, you can then type **ll** and get the results of **ls -l**, and when you type **ls** you get, instead of the output of plain old [ls](https://opensource.com/article/19/7/master-ls-command).

Those aliases are great to have, but they just scratch the surface of what’s possible. Here are the top 10 Bash aliases that, once you try them, you won’t be able to live without.

### Set up first

Before beginning, create a file called **~/.bash_aliases**:

```
$ touch ~/.bash_aliases
```

Then, make sure that this code appears in your **~/.bashrc** file:

```
if [ -e $HOME/.bash_aliases ]; then
    source $HOME/.bash_aliases
fi
```

If you want to try any of the aliases in this article for yourself, enter them into your **.bash_aliases** file, and then load them into your Bash session with the **source ~/.bashrc** command.

- [source](https://opensource.com/article/19/7/bash-aliases)

### Here’s a list of my bash aliases:

By [Bryan Guner](https://medium.com/@bryanguner) on [July 6, 2021](https://medium.com/p/30a6cfafdfeb).

[Canonical link](https://medium.com/@bryanguner/what-are-bash-aliases-and-why-should-you-be-using-them-30a6cfafdfeb)

Exported from [Medium](https://medium.com/) on August 10, 2021.
