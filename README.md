Advent of Code 2021
===============

Welcome to my 2021 attempt at the [Advent Of Code](https://adventofcode.com/2021)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @roryclaasen/advent2021
$ advent2021 COMMAND
running command...
$ advent2021 (-v|--version|version)
@roryclaasen/advent2021/1.0.0 win32-x64 node-v14.17.0
$ advent2021 --help [COMMAND]
USAGE
  $ advent2021 COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`advent2021 Day0 [TEXT]`](#advent2021-day0-text)
* [`advent2021 help [COMMAND]`](#advent2021-help-command)

## `advent2021 Day0 [TEXT]`

This is an Advent of Code example challenge

```
USAGE
  $ advent2021 Day0 [TEXT]

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  name to print
  -t, --throw      throw an error

EXAMPLE
  $ advent2021 Day0
  The answer is: No Input
```

_See code: [src/commands/Day0/index.ts](https://github.com/roryclaasen/advent2021/blob/v1.0.0/src/commands/Day0/index.ts)_

## `advent2021 help [COMMAND]`

display help for advent2021

```
USAGE
  $ advent2021 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.7/src/commands/help.ts)_
<!-- commandsstop -->
