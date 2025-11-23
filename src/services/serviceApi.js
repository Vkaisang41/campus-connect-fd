// src/services/serviceApi.js

export async function fetchServices() {
  return [
    {
      id: 1,
      name: "Laundry Service",
      vendorName: "CleanWave Laundry",
      rating: 4.5,
      reviews: 34,
      price: "KES 250 per kg",
      category: "Laundry",
      description: "Professional laundry service with quick turnaround and quality care for your clothes.",
      institution: "University of Nairobi",
      approved: true,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop",
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "123456",
          accountNumber: "LAUNDRY001",
          instructions: "Pay via M-Pesa Paybill 123456, Account: LAUNDRY001"
        },
        {
          type: "cash",
          instructions: "Cash payment at pickup/delivery"
        }
      ],
      vendorContact: "+254712345678",
      availability: "Mon-Sat 8AM-6PM"
    },
    {
      id: 2,
      name: "Printing Service",
      vendorName: "SwiftPrint",
      rating: 4.2,
      reviews: 17,
      price: "KES 10 per page",
      category: "Printing",
      description: "High-quality printing services for documents, assignments, and posters.",
      institution: "University of Nairobi",
      approved: true,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "987654",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 987654"
        }
      ],
      vendorContact: "+254723456789",
      availability: "Mon-Fri 9AM-5PM"
    },
    {
      id: 3,
      name: "Tutoring",
      vendorName: "TutorHub",
      rating: 4.8,
      reviews: 41,
      price: "KES 500/hr",
      category: "Tutoring",
      description: "Expert tutoring services across various subjects to help you excel academically.",
      institution: "University of Nairobi",
      approved: true,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "456789",
          accountNumber: "TUTOR001",
          instructions: "Pay via M-Pesa Paybill 456789, Account: TUTOR001"
        },
        {
          type: "bank",
          bankName: "KCB Bank",
          accountNumber: "1234567890",
          accountName: "TutorHub Services Ltd",
          instructions: "Bank transfer to KCB account 1234567890"
        }
      ],
      vendorContact: "+254734567890",
      availability: "Mon-Sun 6AM-10PM"
    },
    {
      id: 4,
      name: "Campus Cafe",
      vendorName: "Brew & Study",
      rating: 4.6,
      reviews: 89,
      price: "KES 150-400 per item",
      category: "Food & Beverage",
      description: "Fresh coffee, snacks, and meals perfect for study breaks and quick bites.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "112233",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 112233"
        },
        {
          type: "cash",
          instructions: "Cash payment at counter"
        }
      ],
      vendorContact: "+254745678901",
      availability: "Mon-Sat 7AM-8PM"
    },
    {
      id: 5,
      name: "Bike Rental",
      vendorName: "Campus Cycles",
      rating: 4.3,
      reviews: 52,
      price: "KES 100/hr",
      category: "Transportation",
      description: "Affordable bike rentals for getting around campus quickly and sustainably.",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "334455",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 334455"
        }
      ],
      vendorContact: "+254756789012",
      availability: "Mon-Sat 8AM-6PM"
    },
    {
      id: 6,
      name: "Tech Support",
      vendorName: "IT Solutions",
      rating: 4.7,
      reviews: 28,
      price: "KES 750/hr",
      category: "Technology",
      description: "Computer repair, software installation, and technical assistance for students.",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "556677",
          accountNumber: "TECH001",
          instructions: "Pay via M-Pesa Paybill 556677, Account: TECH001"
        }
      ],
      vendorContact: "+254767890123",
      availability: "Mon-Fri 9AM-5PM"
    },
    {
      id: 7,
      name: "Book Binding",
      vendorName: "Academic Binders",
      rating: 4.4,
      reviews: 33,
      price: "KES 250-750 per book",
      category: "Academic Services",
      description: "Professional binding services for theses, dissertations, and course materials.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "778899",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 778899"
        }
      ],
      vendorContact: "+254778901234",
      availability: "Mon-Fri 8AM-6PM"
    },
    {
      id: 8,
      name: "Photography",
      vendorName: "Campus Capture",
      rating: 4.9,
      reviews: 67,
      price: "KES 1,250-5,000 per session",
      category: "Creative Services",
      description: "Professional photography for events, portraits, and campus activities.",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "990011",
          accountNumber: "PHOTO001",
          instructions: "Pay via M-Pesa Paybill 990011, Account: PHOTO001"
        }
      ],
      vendorContact: "+254789012345",
      availability: "Mon-Sun 8AM-8PM"
    },
    {
      id: 9,
      name: "Car Wash",
      vendorName: "Sparkle Auto",
      rating: 4.1,
      reviews: 45,
      price: "KES 750 per car",
      category: "Automotive",
      description: "Convenient car washing services with eco-friendly products and quick service.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "223344",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 223344"
        }
      ],
      vendorContact: "+254790123456",
      availability: "Mon-Sat 8AM-6PM"
    },
    {
      id: 10,
      name: "Laundry Service",
      vendorName: "FreshWash Laundry",
      rating: 4.3,
      reviews: 67,
      price: "KES 300 per kg",
      category: "Laundry",
      description: "Premium laundry service with express options and garment care specialists.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "445566",
          accountNumber: "LAUNDRY002",
          instructions: "Pay via M-Pesa Paybill 445566, Account: LAUNDRY002"
        }
      ],
      vendorContact: "+254701234567",
      availability: "Mon-Sun 7AM-9PM"
    },
    {
      id: 11,
      name: "Printing Service",
      vendorName: "PrintMaster Pro",
      rating: 4.6,
      reviews: 89,
      price: "KES 8 per page",
      category: "Printing",
      description: "Professional printing services with color options and bulk discounts.",
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "667788",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 667788"
        }
      ],
      vendorContact: "+254712345678",
      availability: "Mon-Sat 8AM-8PM"
    },
    {
      id: 12,
      name: "Tutoring",
      vendorName: "StudySmart Tutors",
      rating: 4.9,
      reviews: 134,
      price: "KES 600/hr",
      category: "Tutoring",
      description: "Expert tutors for all subjects with personalized learning plans.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "889900",
          accountNumber: "TUTOR002",
          instructions: "Pay via M-Pesa Paybill 889900, Account: TUTOR002"
        }
      ],
      vendorContact: "+254723456789",
      availability: "Mon-Sun 7AM-11PM"
    },
    {
      id: 13,
      name: "Campus Cafe",
      vendorName: "JavaHub",
      rating: 4.4,
      reviews: 156,
      price: "KES 200-500 per item",
      category: "Food & Beverage",
      description: "Artisanal coffee, fresh pastries, and healthy meal options for students.",
      image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "001122",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 001122"
        }
      ],
      vendorContact: "+254734567890",
      availability: "Mon-Sat 6AM-9PM"
    },
    {
      id: 14,
      name: "Bike Rental",
      vendorName: "PedalPower",
      rating: 4.5,
      reviews: 78,
      price: "KES 150/hr",
      category: "Transportation",
      description: "Well-maintained bikes with helmet and lock included in rental.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "334455",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 334455"
        }
      ],
      vendorContact: "+254745678901",
      availability: "Mon-Sat 7AM-7PM"
    },
    {
      id: 15,
      name: "Tech Support",
      vendorName: "TechFix Solutions",
      rating: 4.8,
      reviews: 92,
      price: "KES 800/hr",
      category: "Technology",
      description: "Certified technicians for all your device repair and setup needs.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "556677",
          accountNumber: "TECH002",
          instructions: "Pay via M-Pesa Paybill 556677, Account: TECH002"
        }
      ],
      vendorContact: "+254756789012",
      availability: "Mon-Fri 9AM-6PM"
    },
    {
      id: 16,
      name: "Book Binding",
      vendorName: "BindPro Services",
      rating: 4.2,
      reviews: 54,
      price: "KES 400-1,000 per book",
      category: "Academic Services",
      description: "Professional binding for theses, reports, and presentations.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "778899",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 778899"
        }
      ],
      vendorContact: "+254767890123",
      availability: "Mon-Fri 8AM-7PM"
    },
    {
      id: 17,
      name: "Photography",
      vendorName: "LensCraft Studio",
      rating: 4.7,
      reviews: 103,
      price: "KES 1,750-6,000 per session",
      category: "Creative Services",
      description: "Professional photography for events, portraits, and marketing materials.",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "paybill",
          businessNumber: "990011",
          accountNumber: "PHOTO002",
          instructions: "Pay via M-Pesa Paybill 990011, Account: PHOTO002"
        }
      ],
      vendorContact: "+254778901234",
      availability: "Mon-Sun 8AM-9PM"
    },
    {
      id: 18,
      name: "Car Wash",
      vendorName: "AquaClean Auto",
      rating: 4.0,
      reviews: 38,
      price: "KES 600 per car",
      category: "Automotive",
      description: "Eco-friendly car washing with premium wax and interior cleaning options.",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      institution: "University of Nairobi",
      approved: true,
      paymentMethods: [
        {
          type: "mpesa",
          method: "till",
          businessNumber: "223344",
          instructions: "Pay via M-Pesa Buy Goods & Services, Till: 223344"
        }
      ],
      vendorContact: "+254789012345",
      availability: "Mon-Sat 8AM-7PM"
    },
  ];
}

export async function fetchMockBookings() {
  return [
    {
      id: 1,
      service: "Laundry Service",
      vendor: "CleanWave Laundry",
      date: "2025-02-03",
      status: "confirmed",
    },
    {
      id: 2,
      service: "Printing Service",
      vendor: "SwiftPrint",
      date: "2025-02-05",
      status: "pending",
    },
    {
      id: 3,
      service: "Tutoring Session",
      vendor: "TutorHub",
      date: "2025-02-07",
      status: "completed",
    },
  ];
}
