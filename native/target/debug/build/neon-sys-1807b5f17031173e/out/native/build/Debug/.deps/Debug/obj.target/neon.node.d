cmd_Debug/obj.target/neon.node := g++ -shared -pthread -rdynamic -m64  -Wl,-soname=neon.node -o Debug/obj.target/neon.node -Wl,--start-group Debug/obj.target/neon/src/neon.o -Wl,--end-group 
