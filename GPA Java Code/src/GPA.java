import java.util.Scanner;
public class GPA {
    static Scanner scanner=new Scanner(System.in);
    public static double gpachecker(String grade){
        switch (grade){
            case "A+":
                return 4.0;
            case "A":
                return 4.0;

            case "B+":
                return 3.5;
            case "B":
                return 3;
            case "C+":
                return 2.5;
            case "C":
                return 2;
            case "D+":
                return 1.5;
            case "D":
                return 1;
            case "E":
                return 0;
            default:
                System.out.println("Grade Unrecognized");
                String Grade=scanner.nextLine();
                return gpachecker(Grade);

        }

    }
}
