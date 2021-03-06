# [2.12.0](https://github.com/roryclaasen/advent2021/compare/v2.11.5...v2.12.0) (2021-12-17)


### Fix

* Updates prepack command. This was accidentally reverted ([c0de41b](https://github.com/roryclaasen/advent2021/commit/c0de41bdcf86c632768351d42e62859770a973e2))

### New

* Adds day 17 completed challenge ([3c1c8d0](https://github.com/roryclaasen/advent2021/commit/3c1c8d00ff3244ec318cd80e4e15dd83bf06547d))

### Update

* Can now support promise parts ([bcfa671](https://github.com/roryclaasen/advent2021/commit/bcfa67126c4bec14381411b4d167b8cd40210e9a))

## [2.11.5](https://github.com/roryclaasen/advent2021/compare/v2.11.4...v2.11.5) (2021-12-17)


### Fix

* Changes output dir back to lib, fixes oclif readme not picking up the correct dir ([8baf526](https://github.com/roryclaasen/advent2021/commit/8baf526ee91b28267589a586cb6759f48c1bc98e))

## [2.11.4](https://github.com/roryclaasen/advent2021/compare/v2.11.3...v2.11.4) (2021-12-17)


### Fix

* Attempts to fix prepack as its is hanging ([0d89e46](https://github.com/roryclaasen/advent2021/commit/0d89e4601f31af37f5a09be164dec477c4811b2a))

## [2.11.3](https://github.com/roryclaasen/advent2021/compare/v2.11.2...v2.11.3) (2021-12-17)


### Fix

* Adds echo to end of build, prepack is hanging and I need to know where ([a6e9a08](https://github.com/roryclaasen/advent2021/commit/a6e9a0876a0248602a40b761132ab8ce9d575337))

## [2.11.2](https://github.com/roryclaasen/advent2021/compare/v2.11.1...v2.11.2) (2021-12-17)


### Build

* Adds lock file to files that can be updated after a release ([d417ef5](https://github.com/roryclaasen/advent2021/commit/d417ef5b926f71b02139518990c964672ffc2f92))

### Fix

* Possible fix to release being blocked, changes auth to GH_TOKEN ([5159fc7](https://github.com/roryclaasen/advent2021/commit/5159fc79a682171aca59cbe0fc78e7df5bfb07ae))

## [2.11.1](https://github.com/roryclaasen/advent2021/compare/v2.11.0...v2.11.1) (2021-12-17)


### Fix

* Attempts to fix ci issues ([93c0bb2](https://github.com/roryclaasen/advent2021/commit/93c0bb2f3136c06d2d593ab4d377d386bc2d7369))

# [2.11.0](https://github.com/roryclaasen/advent2021/compare/v2.10.0...v2.11.0) (2021-12-16)


### Chore

* Moves tsconfig-paths register to .mochaharc.json ([36c8bc7](https://github.com/roryclaasen/advent2021/commit/36c8bc795b2b68c0694d04d13567f97df6cb4ae5))
* Removes outdated package ([99264c3](https://github.com/roryclaasen/advent2021/commit/99264c3450c3ac2c7420e3529d573d866d80c3d8))

### Docs

* Adds back the readme ([32f6784](https://github.com/roryclaasen/advent2021/commit/32f67849cb3d123f7b274b2e8c43cea6cdd5e906))

### New

* Adds day 16 completed challenge ([8eb69c9](https://github.com/roryclaasen/advent2021/commit/8eb69c9b4224d67ae68539364246713805f17701))

### Upgrade

* Updates @oclif/plugin-help to 5.1.10 ([05cbe2d](https://github.com/roryclaasen/advent2021/commit/05cbe2d58b15dad01521bd7dfe0c18f07be16fc1))

# [2.10.0](https://github.com/roryclaasen/advent2021/compare/v2.9.0...v2.10.0) (2021-12-15)


### Chore

* refactors bottomLeft in day15 to make a bit more sense ([c08f258](https://github.com/roryclaasen/advent2021/commit/c08f2582b04515bde2d5ce83aadd6d6a3b6cda16))
* removes extra function in day15 ([c9fa938](https://github.com/roryclaasen/advent2021/commit/c9fa938ac92dc1c6c20cb7621718c9536d696de1))

### Fix

* Adds input files to build directory ([bd3653e](https://github.com/roryclaasen/advent2021/commit/bd3653e3ef68d73f1475cecbdedab986fa0c252b))
* Fixes tests from not using typescript paths ([5c4e7fc](https://github.com/roryclaasen/advent2021/commit/5c4e7fca4a23316e454aa19e1488a79d23708c7f))

### Update

* Refactors code to use typescript paths ([1c159f0](https://github.com/roryclaasen/advent2021/commit/1c159f0b6800960f4ee441215a492f6cabae11e3))

# [2.9.0](https://github.com/roryclaasen/advent2021/compare/v2.8.0...v2.9.0) (2021-12-15)


### Chore

* Refactors incrementMap to be generic ([3e2494c](https://github.com/roryclaasen/advent2021/commit/3e2494c92e7c94ad5a4e5a855c08cc9066cea6b1))
* Renames parseInput variables in day14 ([cff8460](https://github.com/roryclaasen/advent2021/commit/cff84600f4b07a67171580480ce5166c057cd77a))

### New

* Adds day 15 completed challenge ([8a3ca63](https://github.com/roryclaasen/advent2021/commit/8a3ca6390e942538845f1e21133851be29170f47))

### Update

* Makes day9 use the new PointMap ([cc836c9](https://github.com/roryclaasen/advent2021/commit/cc836c904830b851ce49fa351fe0edfaadbf0982))

# [2.8.0](https://github.com/roryclaasen/advent2021/compare/v2.7.0...v2.8.0) (2021-12-14)


### Chore

* Deconstruct's input parameters if possible ([81794d6](https://github.com/roryclaasen/advent2021/commit/81794d6289879a9b5d6e58b9c410cb4a1e639332))

### New

* Adds day 14 completed challenge ([14f6602](https://github.com/roryclaasen/advent2021/commit/14f66024b5d36744d9e5fd0cd027293a35850b12))

# [2.7.0](https://github.com/roryclaasen/advent2021/compare/v2.6.0...v2.7.0) (2021-12-13)


### New

* Adds day 13 completed challenge ([17d2ad3](https://github.com/roryclaasen/advent2021/commit/17d2ad3247772578c38b16978090a2fd72cada85))

# [2.6.0](https://github.com/roryclaasen/advent2021/compare/v2.5.1...v2.6.0) (2021-12-12)


### Update

* Refactors day12 into one method ([608c5c8](https://github.com/roryclaasen/advent2021/commit/608c5c89ce7d8d72a6bbd9e45eacf7dde5f55d4d))

## [2.5.1](https://github.com/roryclaasen/advent2021/compare/v2.5.0...v2.5.1) (2021-12-12)


### Fix

* lowers valid node version to 12.x ([2ae139a](https://github.com/roryclaasen/advent2021/commit/2ae139afb597adf2995c6d79830fc525392dff86))

# [2.5.0](https://github.com/roryclaasen/advent2021/compare/v2.4.0...v2.5.0) (2021-12-12)


### Chore

* Moves line in day11 into existing loop ([2de041d](https://github.com/roryclaasen/advent2021/commit/2de041db5f60f4f0f8598a4b67aeffbedaa5bc7f))
* Refactors day11 ([211d8dc](https://github.com/roryclaasen/advent2021/commit/211d8dc9996b57c379634c28c0d5edc41f4aa1f2))

### New

* Adds day 12 completed challenge ([9588ca9](https://github.com/roryclaasen/advent2021/commit/9588ca93303392c792be34890b41f7b79fbe7ed3))
* Adds performance time to output ([f26e9ed](https://github.com/roryclaasen/advent2021/commit/f26e9ed2ee46af2940d38e8416b546bd26a6fef0))

# [2.4.0](https://github.com/roryclaasen/advent2021/compare/v2.3.0...v2.4.0) (2021-12-11)


### Chore

* allows for break when onError undefined ([9e5b84c](https://github.com/roryclaasen/advent2021/commit/9e5b84ce2180ec36e14449a1340113c5fdc2f9f9))

### New

* Adds day 11 completed challenge ([87df02e](https://github.com/roryclaasen/advent2021/commit/87df02ed3b0cabaee2197542586f4a520bda49da))

# [2.3.0](https://github.com/roryclaasen/advent2021/compare/v2.2.0...v2.3.0) (2021-12-10)


### Build

* Adds lint step ([60eaaf7](https://github.com/roryclaasen/advent2021/commit/60eaaf7a480da9b9d6cba72c8683a0633fb30b42))

### Chore

* adds return types to all methods ([ffb5e92](https://github.com/roryclaasen/advent2021/commit/ffb5e929c95a89bafab66b33f7686090f60637af))
* moves 'path' import to base.ts ([3a3a9f4](https://github.com/roryclaasen/advent2021/commit/3a3a9f4947035e56022f61a3117488fcfff4ef9b))
* Removes unnecessary method ([55fd8f0](https://github.com/roryclaasen/advent2021/commit/55fd8f096511672ed96b48bc25f024a4cd36f005))
* shares the Point type between classes ([7709702](https://github.com/roryclaasen/advent2021/commit/7709702e578e649c2dcfca86286a3954ed2bdf1a))
* Updates '@oclif/core' to latest ([d137067](https://github.com/roryclaasen/advent2021/commit/d1370674af5f5a8a0e1d29427b01c75b90492b2b))

### Fix

* Reverts back to @oclif/dev-cli ([af89e11](https://github.com/roryclaasen/advent2021/commit/af89e1169255e86666c4fdde7b799db84f9b66f0))

### New

* Adds day 10 completed challenge ([58c1e19](https://github.com/roryclaasen/advent2021/commit/58c1e195af6f4d6bae503d8ab9ba7a6ac945fb98))

# [2.2.0](https://github.com/roryclaasen/advent2021/compare/v2.1.0...v2.2.0) (2021-12-09)


### Update

* Changes license to MIT ([4b5b3ed](https://github.com/roryclaasen/advent2021/commit/4b5b3ed0f82aa08855d8022fd3a6c84c1ea401bc))

# [2.1.0](https://github.com/roryclaasen/advent2021/compare/v2.0.0...v2.1.0) (2021-12-09)


### New

* Adds day 9 completed challenge ([247ad65](https://github.com/roryclaasen/advent2021/commit/247ad65f72a43d1073b04adda3e96ab9c97000f7))

# [2.0.0](https://github.com/roryclaasen/advent2021/compare/v1.6.1...v2.0.0) (2021-12-08)


### Breaking

* Changes default command to lowercase ([0bcfa06](https://github.com/roryclaasen/advent2021/commit/0bcfa0646406718be2785357c98c23cd078c6dc0))

### Fix

* Tests should use correct part1 answer ([432a30a](https://github.com/roryclaasen/advent2021/commit/432a30a491f7328ffea7432215a9de4d7dbaee04))

### New

* Adds day 8 completed challenge ([ce66834](https://github.com/roryclaasen/advent2021/commit/ce66834605089d4644c18c913d6a674147dbf68a))

## [1.6.1](https://github.com/roryclaasen/advent2021/compare/v1.6.0...v1.6.1) (2021-12-07)


### Fix

* Part2 input should be copied before part1 is run ([ef16c94](https://github.com/roryclaasen/advent2021/commit/ef16c9446fc0745db1b3bac58d7bb947763a8a04))

# [1.6.0](https://github.com/roryclaasen/advent2021/compare/v1.5.0...v1.6.0) (2021-12-07)


### Chore

* Changes part2 to use the General Summation Formula. ([96595ab](https://github.com/roryclaasen/advent2021/commit/96595ab37792904c88e80e64c883b080e90ba116))
* Refactors command in prep to run each part separately ([1b42f28](https://github.com/roryclaasen/advent2021/commit/1b42f286892e0fdd7e461e931c4f9d92ec4ed65e))
* Removes some processing cycles by starting at the closest crab ([1158577](https://github.com/roryclaasen/advent2021/commit/115857721df1aa0c33ae4e0d0ba24461353c19cd))

### New

* Adds the ability to run each part individuality ([cf14761](https://github.com/roryclaasen/advent2021/commit/cf14761605c2aa626898e0dd242db71a063601a0))

# [1.5.0](https://github.com/roryclaasen/advent2021/compare/v1.4.0...v1.5.0) (2021-12-07)


### New

* Adds day 7 completed challenge ([61a77d4](https://github.com/roryclaasen/advent2021/commit/61a77d454c1a2281df526e2712d0b8016e80dfc1))

# [1.4.0](https://github.com/roryclaasen/advent2021/compare/v1.3.0...v1.4.0) (2021-12-06)


### Chore

* Makes grid resize itself based off its input ([a31fbee](https://github.com/roryclaasen/advent2021/commit/a31fbee995e0580c1c820d5bd8149becbedc4d60))

### New

* Adds day 6 completed challenge ([77ceea9](https://github.com/roryclaasen/advent2021/commit/77ceea9e61506db471bb1058ad7835e562108e21))

# [1.3.0](https://github.com/roryclaasen/advent2021/compare/v1.2.0...v1.3.0) (2021-12-05)


### New

* Adds command aliases to all current challenges ([cecb1c6](https://github.com/roryclaasen/advent2021/commit/cecb1c6f0e9c2345305b42ef21789e82abf438cf))
* Adds day 5 completed challenge ([49f3a3c](https://github.com/roryclaasen/advent2021/commit/49f3a3c3f9e71d6498156da0ab91c9e362e57eef))

### Upgrade

* Updates all packages to latest (not eslint) ([aae4ca8](https://github.com/roryclaasen/advent2021/commit/aae4ca8a206b3e85059bd812a369c308cb430efa))

# [1.2.0](https://github.com/roryclaasen/advent2021/compare/v1.1.1...v1.2.0) (2021-12-04)


### Chore

* Ensures all lines read are in '\n' format ([66ff1ce](https://github.com/roryclaasen/advent2021/commit/66ff1ce975e541336a4f99b54e6b21ff71177c97))

### New

* Adds day 4 completed challenge ([e6deac2](https://github.com/roryclaasen/advent2021/commit/e6deac22dfd69067deccd153e5b41bdc08c40038))

## [1.1.1](https://github.com/roryclaasen/advent2021/compare/v1.1.0...v1.1.1) (2021-12-03)


### Chore

* Removes final line in input files ([0b9cb9e](https://github.com/roryclaasen/advent2021/commit/0b9cb9ecfbc235d0b1f5c1890e5cf51070c6ca3b))
* Removes generic type from challenge commands as they're not needed ([82bbe5b](https://github.com/roryclaasen/advent2021/commit/82bbe5bfed5731026f3a4b1c506e5cd2e93c4a1a))
* Updates vscode settings to ignore paintext files ([16daefd](https://github.com/roryclaasen/advent2021/commit/16daefd056a858158919b55efb08f559737bf03c))

### Fix

* Changes Day3 test name to actually be Day3 ([eec5a41](https://github.com/roryclaasen/advent2021/commit/eec5a41d5bd0b405a1af1cb7ffc860a79d72781d))

# [1.1.0](https://github.com/roryclaasen/advent2021/compare/v1.0.3...v1.1.0) (2021-12-03)


### Build

* Adds GH_TOKEN ([e7269b8](https://github.com/roryclaasen/advent2021/commit/e7269b8f7dafd28a8eb473f54c332ad0440a2b8e))
* Adds new workflow for pull requests. Adds workflow testing for node versions ([76c637a](https://github.com/roryclaasen/advent2021/commit/76c637a07c33e2e224f13a32abc6024f8e7d7bd2))

### Chore

* Adds tests using the example data ([5b00f4e](https://github.com/roryclaasen/advent2021/commit/5b00f4ecce28bbc7106fc6483bf4c95055d7c0d3))

### Docs

* Updates changelog to have some data for v1.0.0 ([b8ae6c5](https://github.com/roryclaasen/advent2021/commit/b8ae6c5650049b68317845ac4fc95797ba3dfab0))

### New

* Adds day 3 completed challenge ([de26e08](https://github.com/roryclaasen/advent2021/commit/de26e08a275276852a9445662757beb50a8357ca))

## [1.0.3](https://github.com/roryclaasen/advent2021/compare/v1.0.2...v1.0.3) (2021-12-02)


### Fix

* Changes package manager from pnpm back to npm ([462dd39](https://github.com/roryclaasen/advent2021/commit/462dd39a8566b97ea5d6e751f15ca17b594474c5))

## [1.0.2](https://github.com/roryclaasen/advent2021/compare/v1.0.1...v1.0.2) (2021-12-02)


### Fix

* Changes package manager from pnpm back to npm ([42c88e2](https://github.com/roryclaasen/advent2021/commit/42c88e2b5a0387211c2770ed5feed9979e92c2c1))

## [1.0.1](https://github.com/roryclaasen/advent2021/compare/v1.0.0...v1.0.1) (2021-12-02)


### Fix

* removes private field from package.json ([f614842](https://github.com/roryclaasen/advent2021/commit/f614842cd8b599eef4a41b3ecd0cc6e00203d0d7))
* Sets the preset for @semantic-release/release-notes-generator ([0ef6059](https://github.com/roryclaasen/advent2021/commit/0ef6059423758b0e5237fc4b2b5bffae2f48bf78))

# 1.0.0 (2021-12-02)

### New

* Adds day 2 solution ([520b635](https://github.com/roryclaasen/advent2021/commit/520b635ad98722e2303cd79f1efcdfd89621529d))
* Adds day 1 attempt ([1f64082](https://github.com/roryclaasen/advent2021/commit/1f64082cf430d3a7f58f438c8f62b13ecb9a80f8))
* Adds initial setup for advent of code 2021 ([9e8077d](https://github.com/roryclaasen/advent2021/commit/9e8077dec52ce09f16de1979c5935869f196ed49))
