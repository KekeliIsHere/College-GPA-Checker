import java.util.Scanner;
public class GPAMain extends GPA {

    static void main() {
        double totalPoints=0;
        int credit=1;
        //In Ashesi all course creits are 1.
        int totalCredits=0;
        Scanner input = new Scanner(System.in);
        System.out.println("How many courses did you take?");
        int coursesTaken=input.nextInt();
        String[] courses=new String[coursesTaken];
        String [] grades=new String[coursesTaken];
        for(int i=0;i<coursesTaken;i++){
            System.out.println("Name of Course :");
            String courseName= input.next();
            courses[i]=courseName;
            System.out.println("Grade in "+courseName+":");
            String grade=input.next().toUpperCase();
            double gpa=gpachecker(grade);
            grades[i]=grade;
            totalCredits+=credit;
            totalPoints+=(gpa*credit);
        }
        double semesterGPA=totalPoints/totalCredits;
        for(int i=0;i<coursesTaken;i++){
            System.out.println("Course Name: "+courses[i]);
            System.out.println("Grade: "+grades[i]);
            System.out.println("Grade Point: "+gpachecker(grades[i]));
        }
        System.out.println("Your Semester GPA is "+semesterGPA);



    }


}
`