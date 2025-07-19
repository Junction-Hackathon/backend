import { PrismaClient, UserRole, SacrificeStatus, VideoStatus, TransactionStatus, GatewayEnum, NotificationStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const password = await bcrypt.hash('password123', saltRounds);

  // Create Users
  const organizer = await prisma.user.create({
    data: {
      email: 'organizer@test.com',
      firstName: 'Organizer',
      lastName: 'User',
      password,
      phoneNumber: '1234567890',
      role: UserRole.ORGANIZER,
    },
  });

  const dba7 = await prisma.user.create({
    data: {
      email: 'dba7@test.com',
      firstName: 'Dba7',
      lastName: 'User',
      password,
      phoneNumber: '1234567890',
      role: UserRole.DBA7,
    },
  });

  const donor = await prisma.user.create({
    data: {
      email: 'donor@test.com',
      firstName: 'Donor',
      lastName: 'User',
      password,
      phoneNumber: '1234567890',
      role: UserRole.DONOR,
    },
  });

  // Create a Donation
  const transaction = await prisma.transaction.create({
    data: {
      paymentMethod: 'Credit Card',
      amount: 100.0,
      currency: 'USD',
      status: TransactionStatus.succeeded,
      gateway: GatewayEnum.STRIPE,
      userDonationTransaction: {
        create: {
          donorId: donor.id,
          qty: 1,
          year: new Date().getFullYear(),
        },
      },
    },
  });

  // Create a Sacrifice
  const sacrificeVideo = await prisma.sacrificeVideo.create({
    data: {
      url: 'https://example.com/video.mp4',
      blurUrl: 'https://example.com/video_blur.mp4',
      jobId: 'job123',
      status: VideoStatus.confirmed,
    },
  });

  const location = await prisma.location.create({
    data: {
      long: 40.7128,
      lat: -74.0060,
    },
  });

  const sacrifice = await prisma.sacrifice.create({
    data: {
      donorId: donor.id,
      status: SacrificeStatus.pending,
      currentLocationId: location.id,
      sacrificeVideoId: sacrificeVideo.id,
      sacrificedById: dba7.id,
      year: new Date().getFullYear(),
    },
  });

  // Update Sacrificer's count
  await prisma.sacrificerSacrificesCount.create({
    data: {
      sacrificerId: dba7.id,
      count: 1,
      doneCount: 0,
      year: new Date().getFullYear(),
    },
  });

  // Create a Notification
  await prisma.notification.create({
    data: {
      receiverId: donor.id,
      title: 'Sacrifice Update',
      content: 'Your sacrifice has been assigned to a sacrificer.',
      status: NotificationStatus.sent,
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
