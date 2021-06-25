# Package

version       = "0.2.0"
author        = "C-NERD"
description   = "A proxy server to help bypass CORS browser restrictions"
license       = "MIT"
srcDir        = "src"
bin           = @["corsproxy"]


# Dependencies

requires "nim >= 1.0.0", "jester >= 0.4.3"

task release, "compiles a release version of the code with thread support":
    exec "nim c -d:ssl -d:useStdLib -d:release -d:danger -o:bin/corsproxy --threads:on src/corsproxy.nim"
    cpFile "public/settings.json", "bin/settings.json"
