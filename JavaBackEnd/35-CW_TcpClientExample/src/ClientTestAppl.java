import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;



public class ClientTestAppl {
	
	static final String HOST = "localhost";
	static final int PORT = 5000;

	public static void main(String[] args) throws Exception{
		try (Socket socket = new Socket(HOST, PORT);
				BufferedReader consoleReader = new BufferedReader(new InputStreamReader(System.in));
				BufferedReader socketReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
				PrintStream socketWriter = new PrintStream(socket.getOutputStream())) {
			while (true) {
				String line= null;
				String socketLine = "";
				System.out.println("enetr request type (length or reverse) or quit");
				line = consoleReader.readLine();
				if (line.equalsIgnoreCase("quit")) {
					break; 
				}
				socketLine = line + "#";
				System.out.println("enter any string");
				line = consoleReader.readLine();
				socketLine += line;
				socketWriter.println(socketLine);
				line = socketReader.readLine();
				System.out.println(line);
				
				
			}
		}
	}
}
